'use strict';
var co = require('co');
var fs = require('fs');
var koa = require('koa');
var router = require('koa-router')();
var cors = require('koa-cors');
import * as http from 'http';
var koaBody = require('koa-body');
var app = koa();
require('source-map-support').install();

var child_process = require('child_process');

class SessionStore {
    sessions:{[sid: string]: Session} = {};

    get(sid:string) {
        if (!this.sessions[sid]) {
            throw new Error(`Sid: ${sid} not found`);
        }
        return this.sessions[sid];
    }

    create(data:any, socket:any) {
        var session = new Session(data, socket);
        this.sessions[session.sid] = session;
        return session;
    }
}
var sessions = new SessionStore();

enum ContentType {
    VIDEO,
    AUDIO,
    EN_AUDIO,
    RU_AUDIO,
    SUBS,
    EN_SUBS,
    RU_SUBS
}

interface Stream {
    n: number;
    type:ContentType;
    file: string;
    format?:string;
    aid?: number;
    size?: {w:number; h:number};
    lang?: string;
    title?: string;
    channels?: number;
}
interface MediaInfo {
    duration: number;
    streams: Stream[];
}

function mediaInfo(stdout:string) {
    var res = stdout.match(/Duration: (\d+):(\d+):(\d+)/) || [0, 0, 0, 0];
    var track:MediaInfo = {streams: [], duration: +res[1] * 3600 + +res[2] * 60 + +res[3]};
    var streams:string[] = stdout.match(/Stream \#.*\n(\s+Metadata:\n(\s{5,}.*\n)*)?/g) || [];
    for (var i = 0; i < streams.length; i++) {
        var m:string[] = streams[i].replace(/\s+/g, ' ').match(/Stream \#0.(\d+)(\((.*?)\))?: ((Video): (.*?), .*?, (\d+x\d+)|(Audio): (.*?), .*?, (.*?), (.*? title : (.*?) $)?|(Subtitle): (.*? title : (.*?) $)?)/) || [];
        var k = +m[1];
        if (!track.streams[k]) {
            if (m[5]) {
                var m2 = (m[7] || '').match(/(\d+)x(\d+)/);
                var size = {w: +m2[1], h: +m2[2]};
                track.streams[k] = {
                    n: k,
                    type: ContentType.VIDEO,
                    format: m[6] || '',
                    size: size,
                    file: 'video.mp4'
                };
            }
            if (m[8]) {
                var channels = (m[10].match(/5.1/) ? 6 : (m[10].match(/mono/) ? 1 : 2) );
                track.streams[k] = {
                    n: k,
                    type: ContentType.AUDIO,
                    lang: m[3] || '',
                    format: m[9] || '',
                    channels: channels,
                    file: 'audio' + k + '.mp4',
                    title: m[12] || ''
                };
            }
            if (m[13]) {
                track.streams[k] = {
                    n: k,
                    type: ContentType.SUBS,
                    lang: m[3] || '', title: m[15] || '',
                    file: 'sub' + k + '.srt'
                };
            }
        }
    }
    //console.log(sinfo);

    var aid = 0;
    for (var i = 0; i < track.streams.length; i++) {
        if (track.streams[i].type == ContentType.AUDIO) {
            track.streams[i].aid = aid;
            aid++;
        }
    }
    //console.log("------------------------------------", streams, track);
    console.log(track);
    return track;
}

function exec(exec:string, params?:{timeout?: number}) {
    return new Promise((resolve, reject) => {
        child_process.exec(exec, params,
            (err:Buffer, stdout:Buffer, stderr:Buffer) =>
                err ? reject(err) : resolve(stdout.toString() + stderr.toString()));
    });
}

class Session {
    sid = Math.random().toString(33).substr(3, 5);
    currentTime = 0;
    stdout = '';
    videoServer:{[id:string]: {res: {writable: boolean; write:(data:Buffer)=>void}}} = {};
    activeVideoStreams = 0;
    size:number;
    filename:string;
    fileExt:string;
    folder:string;
    inputFile:string;
    track:MediaInfo;
    duration:number;
    startTime:number;
    socket:{emit: (name:string, obj:any)=>void};

    constructor(data:{size: number; filename: string; duration: number; startTime: number}, socket: any) {
        this.socket = socket;
        this.size = data.size;
        this.filename = data.filename;
        this.fileExt = data.filename.split('.').pop();
        this.folder = this.sid + '/';
        this.inputFile = this.folder + 'input.' + this.fileExt;
        this.duration = data.duration;
        this.startTime = data.startTime;
        console.log(data);

        fs.mkdirSync(this.folder);
    }

    extract() {
        console.log("Extract start", this.track.streams);
        return exec('ffmpeg -y -i ' + this.inputFile + ' ' +
            this.track.streams.map(track => '-map 0:' + track.n + ' -c copy ' + this.folder + track.file).join(' '));
    }

    sendProgress(time:number){
        this.socket.emit('progress', {
            time: Math.min(time, this.duration),
            progress: Math.min(time / this.duration, 1)
        });
    }

    startFFmpeg() {
        var ls = require('child_process').spawn('ffmpeg', ['-y', '-ss', this.startTime, '-i', 'http://localhost:1338/' + this.sid, '-acodec', 'copy', '-vcodec', 'copy', '-scodec', 'copy', '-map', '0', this.inputFile]);
        ls.stdout.on('data',  (data:Buffer) => {
            //console.log('stdout: ' + data);
        });

        ls.stderr.on('data', (data:Buffer) => {
            this.stdout += data.toString();
            var t:string[] = data.toString().match(/time=(\d+):(\d+):(\d+\.\d+)/) || [];
            var time = +t[1] * 3600 + +t[2] * 60 + +t[3];
            //console.log('stderr: ' + data);
            if (time > 0) {
                console.log('time: ', time);
                this.currentTime = time;
                this.sendProgress(time);
                if (time > this.duration) {
                    ls.kill();
                }
            }
        });

        ls.on('close', (code:number) => {
            console.log('child process exited with code ' + code);
        });
    }

    done() {
        this.track = mediaInfo(this.stdout);
        this.extract().then(data => {
            this.socket.emit('done', this.track);
            console.log("extract info", data);
        }).catch(err => console.error(err));
    }

    closeConnection(id:string):void {
        this.socket.emit('close', {id: id});
        this.videoServer[id] = null;
        this.activeVideoStreams--;
        if (this.activeVideoStreams === 0) {
            this.done();
        }
    }

    createConnection(start:number, res:any) {
        this.activeVideoStreams++;
        var id = Math.random().toString(33).substr(2, 5);
        this.videoServer[id] = {res: res};
        this.socket.emit('data-need', {id: id, start: start});
        return id;
    }

    getVideoConnection(id:string) {
        if (!this.videoServer[id]) {
            console.error(`VideoConnection:${id} not found`);
        }
        return this.videoServer[id];
    }
}

import * as IO from 'socket.io';
var io = IO(7878);
io.on('connection', socket => {
    socket.on('start-upload', (data:any, callback:(sid:string)=>void) => {
        var session = sessions.create(data, socket);
        console.log("start-upload", data);
        session.startFFmpeg();
        callback(session.sid);
    });

    socket.on('data', (data:{id: string; file: Buffer; sid: string}, callback:()=>void) => {
        var session = sessions.get(data.sid);
        var con = session.getVideoConnection(data.id);
        if (con) {
            var videoRes = con.res;
            if (videoRes.writable) {
                videoRes.write(data.file);
            }
        }
        callback();
    });
});

http.createServer((req, res) => {
    var session = sessions.get(req.url.split('/').pop());

    var total = session.size;
    if (req.headers['range']) {
        var range = req.headers.range;

        var parts = range.replace(/bytes=/, "").split("-");
        var partialstart = parts[0];
        var partialend = parts[1];

        var start = parseInt(partialstart, 10);
        var end = partialend ? parseInt(partialend, 10) : total - 1;
        var chunksize = (end - start) + 1;

        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize
        });
    } else {
        start = 0;
        res.writeHead(200, {'Content-Length': session.size});
    }

    if (start < session.size) {
        const id = session.createConnection(start, res);
        //console.log("connected", req.headers);
        req.on('close', () => {
            console.log('close');
            session.closeConnection(id);
        });

        //console.log("data-need", start);
    }
    else {
        console.error('data-need over size');
    }
}).listen(1338, '127.0.0.1');