"use strict";
import "./app.css";
import {Route} from "./Router";
import {Router} from "./Router";
import * as React from 'react';
import * as classNames from 'classnames';
import {IGetPost} from '../../backend/interfaces/transport';
import {TrackInfo} from '../../backend/interfaces/track-info';
import {Post} from '../../backend/interfaces/post';
import {Line} from '../../backend/interfaces/line';
declare var io:(url:string)=>Socket;
declare var YT:any;
interface Socket {
    emit: (m:string, data:any, callback:(...args:any[])=>void)=>void;
    on: (m:string, data:any)=>void;
}

interface MediaResult {
    video: TrackInfo;
    subs: TrackInfo[];
    audio: TrackInfo[];
}

class Uploader extends React.Component<{onDone?: (info:MediaResult)=>void; onInfo?: (info:any)=>void;}, {}> {
    sid:string;
    startUploadTime = 0;
    startExtractTime = 0;
    preSize = 0.2;
    middleSize = 0.6;
    endSize = 0.2;
    progress = 0;
    uploadDone = false;
    extractDone = false;
    isSending = false;
    streams:{[ind: string]:boolean} = {};
    socket = io('http://localhost:7878');
    fileSelected = false;
    error = false;
    interval:number;

    getFile() {
        var fileInput = React.findDOMNode(this.refs['fileInput']) as HTMLInputElement;
        return fileInput.files[0];
    }

    onChange = ()=> {
        this.fileSelected = true;
        this.forceUpdate();
    };

    on(event:string, callback:(data:any)=>void) {
        this.socket.on(event + '-' + this.sid, (data:any)=> {
            console.log(event, this.sid, data);
            callback(data);
            this.forceUpdate();
        });
    }

    send() {
        this.isSending = true;
        this.startUploadTime = Date.now();

        this.interval = setInterval(()=>this.forceUpdate(), 600);
        this.forceUpdate();

        return new Promise((resolve, reject) => {
            var file = this.getFile();
            var info = {
                startTime: this.startTime,
                endTime: this.endTime,
                filename: file.name,
                size: file.size
            };
            console.log(info);
            console.time('process');
            this.socket.emit('start-upload', info, (sid:string) => {
                this.sid = sid;
                this.on('close', this.onClose);
                this.on('data-need', this.onDataNeed);
                this.on('info', this.onInfo);
                this.on('upload-done', this.onUploadDone);
                this.on('done', this.onDone);
                this.on('progress', this.onProgress);
                this.on('err', this.onError)
            });
        });
    }

    onClose = (data:{id: string}) => {
        this.stopStream(data.id);
    };

    onDataNeed = (data:{start: number, id: string}) => {
        this.sendStream(data.start, data.id);
    };

    onInfo = (info:MediaResult) => {
        if (this.props.onInfo) {
            this.props.onInfo(info);
        }
    };

    onDone = (info:MediaResult) => {
        this.extractDone = true;
        clearInterval(this.interval);
        if (this.props.onDone) {
            this.props.onDone(info);
        }
    };

    onUploadDone = () => {
        console.timeEnd('process');
        this.startExtractTime = Date.now();
        this.uploadDone = true;
    };

    onProgress = (data:{progress: number}) => {
        this.progress = data.progress;
    };

    onError = (err:string) => {
        console.error(err);
        this.error = true;
        this.uploadDone = false;
        this.isSending = false;
        this.extractDone = false;
        this.progress = 0;
        this.startExtractTime = 0;
        this.startUploadTime = 0;
    };

    stopStream(id:string) {
        console.log("stopStream", id);
        this.streams[id] = false;
    }

    sendStream(start:number, id:string, partSize?:number) {
        if (this.uploadDone || this.error) {
            return;
        }
        if (!partSize) {
            partSize = 10000;
        }
        partSize = Math.min(partSize, 1000000);
        var file = this.getFile();

        this.streams[id] = true;
        var reader = new FileReader();
        var end = Math.min(start + partSize, file.size);
        if (end - start > 0) {
            console.log("sendStream", this.sid, start, end - start, id);
            reader.readAsArrayBuffer(file.slice(start, end));
            reader.onloadend = e => {
                if (reader.readyState == 2) {
                    this.socket.emit('data', {
                        sid: this.sid,
                        start: start,
                        id: id,
                        size: reader.result.length,
                        file: reader.result
                    }, () => {
                        if (this.streams[id]) {
                            this.sendStream(start + partSize, id, partSize * 2);
                        }
                    });
                }
            };
        }
    }

    calcProgress() {
        var middlePercent = this.progress;
        var timeElapsed = (Date.now() - this.startUploadTime) / 100 | 0;
        var prePercent = 0;
        var endPercent = 0;
        if (!middlePercent) {
            for (var i = 0; i < timeElapsed; i++) {
                prePercent += 0.05 * (1 - prePercent);
            }
        }
        else {
            prePercent = 1;
            if (this.startExtractTime) {
                var extractTimeElapsed = (Date.now() - this.startExtractTime) / 100 | 0;
                for (var i = 0; i < extractTimeElapsed; i++) {
                    endPercent += 0.05 * (1 - endPercent);
                }
            }
        }
        if (this.extractDone) {
            endPercent = 1;
        }

        return prePercent * this.preSize + middlePercent * this.middleSize + endPercent * this.endSize;
    }

    _startTime = Math.random() * 1000 | 0;
    _endTime = this._startTime + 20;

    startTime:string;
    endTime:string;

    secToTime(sec:number) {
        return ('0' + (sec / 3600 | 0)).substr(-2) + ':' + ('0' + (sec / 60 | 0)).substr(-2) + ':' + ('0' + (sec % 60)).substr(-2);
    }

    render() {
        return <div>
            {this.error ? 'Error occured' :
                this.extractDone ?
                    'Uploaded'
                    :
                    (this.isSending ?
                    <progress value={this.calcProgress().toString()}/>
                        :
                    <div>
                        {this.fileSelected ?
                        <div>
                            <input value={this.secToTime(this._startTime)}
                                   ref={d => this.startTime = (React.findDOMNode(d) as HTMLInputElement).value}
                                   type="text"/>
                            <input value={this.secToTime(this._endTime)}
                                   ref={d => this.endTime = (React.findDOMNode(d) as HTMLInputElement).value}
                                   type="text"/>
                            <button onClick={()=>this.send()}>Submit</button>
                        </div>
                            :
                        <input ref="fileInput" onChange={this.onChange} type="file"/>}
                    </div>)
                }
        </div>
    }
}

class SelectMedia extends React.Component<{onChange: (val:string)=>void; items: TrackInfo[]; label: string},{}> {
    selected = this.props.items.length ? this.props.items[0] : null;

    onChange(item:TrackInfo) {
        this.props.onChange(item.id);
        this.selected = item;
        this.forceUpdate();
    }

    render() {
        this.props.onChange(this.selected ? this.selected.id : null);
        return <div>
            <label>{this.props.label}</label>
            {this.props.items.map((item, i) => <div>
                <label>
                    <input required
                           name={this.props.label}
                           checked={this.selected == item}
                           value={item.id}
                           onChange={()=>this.onChange(item)}
                           type="radio"/>
                    {`${item.title} (${item.lang})`}
                </label>
            </div>)}
        </div>
    }

}
class Main extends React.Component<{params: any, resolved: any},{}> {
    res:MediaResult;
    postId:string;
    form:Post = {title: 'Hello', video: null, enAudio: null, ruAudio: null, enSub: null, ruSub: null};
    videoDone = (res:MediaResult)=> {
        this.res = res;
        this.form.video = res.video.id;
        this.forceUpdate();
    };

    onSubmit = () => {
        fetch('http://localhost:1335/v1/post', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.form)
        }).then(data => data.json()).then(data => {
            //this.postId = data.data;
            postRoute.goto({id: data.data})
            this.forceUpdate();
            console.log('Success');
        });
        return false;
    }

    filterLang(items:TrackInfo[], lang:string) {
        return items.filter(item => !item.lang || item.lang == lang);
    }

    render() {
        return <div>
            {this.res ?
            <div>
                <form onSubmit={this.onSubmit}>
                    <SelectMedia label="En Audio"
                                 onChange={val => this.form.enAudio = val}
                                 items={this.filterLang(this.res.audio, 'eng')}/>
                    <SelectMedia label="Ru Audio"
                                 onChange={val => this.form.ruAudio = val}
                                 items={this.filterLang(this.res.audio, 'rus')}/>
                    <SelectMedia label="En Subs"
                                 onChange={val => this.form.enSub = val}
                                 items={this.filterLang(this.res.subs, 'eng')}/>
                    <SelectMedia label="Ru Subs"
                                 onChange={val => this.form.ruSub = val}
                                 items={this.filterLang(this.res.subs, 'rus')}/>
                    <div>
                        <button>Create</button>
                    </div>
                </form>
            </div>
                :
            <Uploader onDone={this.videoDone}/>
                }
        </div>
    }
}

class Viewer extends React.Component<{params: any, resolved: IGetPost}, {}> {
    currentTime:number;
    videoWrapper:Element;

    static load(params:any):Promise<IGetPost> {
        console.log(params);
        var id = params.id;
        return fetch('http://localhost:1335/v1/post/' + id).then(data => data.json()).then(data => data.data);
    }

    componentDidMount() {
        var data = this.props.resolved;
        var videoId = data.mediaFiles[data.post.video].url.split('=').pop();
        var div = document.createElement('div');
        div.id = Math.random().toString();
        this.videoWrapper.appendChild(div);
        var player = new YT.Player(div.id, {
            height: '390',
            width: '640',
            videoId: videoId,
            p1layerVars: {'autoplay': 1, 'controls': 0, iv_load_policy: 3, modestbranding: 1, rel: 0, showinfo: 0},
            events: {
                'onReady': (event:any) => {
                    event.target.playVideo();
                    setInterval(() => {
                        this.currentTime = player.getCurrentTime();
                        console.log(this.currentTime);
                        this.forceUpdate();
                    }, 100);
                },
                'onStateChange': onPlayerStateChange
            }
        });

        var done = false;

        function onPlayerStateChange(event:any) {
            if (event.data == YT.PlayerState.PLAYING && !done) {
                //setTimeout(stopVideo, 6000);
                done = true;
            }
        }

        function stopVideo() {
            player.stopVideo();
        }
    }

    isSelected(line: Line){
        var data = this.props.resolved;
        if (line.en) {
            var textLine = data.textLines[line.en];
            return ((textLine.start) / 100) <= this.currentTime && this.currentTime <= (textLine.start + textLine.dur) / 100
        }
        return false;
    }


    render() {
        var data = this.props.resolved;
        return <div>
            {this.currentTime}
            <div ref={d => this.videoWrapper = React.findDOMNode(d)} className="video"></div>
            <div className="subtitles">
                {data.lines.map(line => <div className={classNames("line", {selected: this.isSelected(line)})}>
                    <div className="en">{line.en ? data.textLines[line.en].text : ''}</div>
                    <div className="ru">{line.ru ? data.textLines[line.ru].text : ''}</div>
                </div>)}
            </div>
        </div>
    }
}

var postRoute = new Route<{id:number}>('/post/:id');
React.render(<Router pages={[
    {route: new Route('/'), handler: Main},
    {route: postRoute, handler: Viewer, resolver: Viewer.load}
]}/>, document.body);



