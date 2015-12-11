"use strict";
import * as React from 'react';
declare var io:(url:string)=>Socket;
interface Socket {
    emit: (m:string, data:any, callback:(...args:any[])=>void)=>void;
    on: (m:string, data:any)=>void;
}
class Uploader extends React.Component<{}, {}> {
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

        var interval = setInterval(()=>this.forceUpdate(), 600);
        this.forceUpdate();

        return new Promise((resolve, reject) => {
            var fileInput = React.findDOMNode(this.refs['fileInput']) as HTMLInputElement;
            var file = fileInput.files[0];
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
                this.on('close', (data:{id: string}) => {
                    this.stopStream(data.id);
                });
                this.on('data-need', (data:{start: number, id: string}) => {
                    this.sendStream(file, data.start, data.id);
                });
                this.on('upload-done', (data:{}) => {
                    console.timeEnd('process');
                    this.startExtractTime = Date.now();
                    this.uploadDone = true;
                });
                this.on('done', (data:{}) => {
                    this.extractDone = true;
                    clearInterval(interval);
                });
                this.on('progress', (data:{progress: number}) => {
                    this.progress = data.progress;
                });
                this.on('err', (err:string) => {
                    console.error(err);
                })
            });
        });
    }

    stopStream(id:string) {
        console.log("stopStream", id);
        this.streams[id] = false;
    }

    sendStream(file:File, start:number, id:string, partSize?:number) {
        if (this.uploadDone) {
            return;
        }
        if (!partSize) {
            partSize = 10000;
        }
        partSize = Math.min(partSize, 1000000);

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
                            this.sendStream(file, start + partSize, id, partSize * 2);
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
            { this.extractDone ?
                'Uploaded'
                :
                (this.isSending ?
                <progress value={this.calcProgress().toString()}/>
                    :
                <div>
                    <input ref="fileInput" onChange={this.onChange} type="file"/>
                    {this.fileSelected ?
                    <div>
                        <input type="text"/>
                        <input type="text"/>
                        <button onClick={()=>this.send()}>Submit</button>
                    </div> : ''}
                </div>)}
        </div>
    }
}

class Main extends React.Component<{},{}> {
    render() {
        return <div>
            <Uploader/>
            <Uploader/>
        </div>
    }
}

React.render(<Main/>, document.body);



