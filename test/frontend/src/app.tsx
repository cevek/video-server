import MouseEvent = __React.MouseEvent;
"use strict";
import * as React from 'react';
import {TrackInfo} from '../../backend/interfaces/track-info';
import {Post} from '../../backend/interfaces/post';
declare var io:(url:string)=>Socket;
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
class Main extends React.Component<{},{}> {
    res:MediaResult;
    form:Post = {title: 'Hello', enAudio: null, ruAudio: null, enSub: null, ruSub: null};
    videoDone = (res:MediaResult)=> {
        this.res = res;
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
        }).then(() => {
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
            <Uploader onDone={this.videoDone}/> }

        </div>
    }
}

React.render(<Main/>, document.body);



