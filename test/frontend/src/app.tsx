"use strict";
import * as React from 'react';
import {TrackInfo} from '../../backend/interfaces/track-info';
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
    startTime = 0;
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
        this.startTime = Date.now();

        this.interval = setInterval(()=>this.forceUpdate(), 600);
        this.forceUpdate();

        return new Promise((resolve, reject) => {
            var file = this.getFile();
            var info = {
                startTime: Math.random() * 5000 | 0,
                duration: 18,//(Math.random() * 300 | 0) + 60,
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
        this.startTime = 0;
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
        var timeElapsed = (Date.now() - this.startTime) / 100 | 0;
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
                            <input type="text"/>
                            <input type="text"/>
                            <button onClick={()=>this.send()}>Submit</button>
                        </div>
                            :
                        <input ref="fileInput" onChange={this.onChange} type="file"/>}
                    </div>)
            }
        </div>
    }
}

class SelectMedia extends React.Component<{items: TrackInfo[]; label: string},{}> {
    onChange(item:TrackInfo) {
        this.forceUpdate();
    }

    render() {
        return <div>
            <label>{this.props.label}</label>
            {this.props.items.map(item => <div>
                <label>
                    <input name={this.props.label} onChange={()=>this.onChange(item)} type="radio"/>
                    {`${item.title} (${item.lang})`}
                </label>
            </div>)}
        </div>
    }

}
class Main extends React.Component<{},{}> {
    res:MediaResult;
    videoDone = (res:MediaResult)=> {
        this.res = res;
        this.forceUpdate();
    };

    render() {
        return <div>
            {this.res ?
            <div>
                <SelectMedia label="En Audio" items={this.res.audio}/>
                <SelectMedia label="Ru Audio" items={this.res.audio}/>
                <SelectMedia label="En Subs" items={this.res.subs}/>
                <SelectMedia label="Ru Subs" items={this.res.subs}/>
            </div>
                :
            <Uploader onDone={this.videoDone}/> }

        </div>
    }
}

React.render(<Main/>, document.body);



