"use strict";
import {config} from "./config";
import {MediaInfo} from "./media-info";
import {mediaInfo} from "./media-info";
import {exec} from "./utils";
import * as fs from 'fs';
import {spawn} from "./utils";
//import {spawn} from 'child_process';

export class Session {
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
    timeout = 10 * 60; // 10 min timeout;
    maxParts = 100;
    isDone = false;

    constructor(data:{size: number; filename: string; duration: number; startTime: number}, socket:any) {
        //todo: check all props
        this.socket = socket;
        this.size = data.size;
        this.filename = data.filename;
        this.fileExt = data.filename.split('.').pop();
        this.folder = config.dir + this.sid + '/';
        this.inputFile = this.folder + 'input.' + this.fileExt;
        this.duration = data.duration;
        this.startTime = data.startTime;
        console.log(data);
        fs.mkdirSync(this.folder);
    }

    extract() {
        console.log("Extract start");
        return exec('ffmpeg -y -i ' + this.inputFile + ' ' +
            this.track.streams.map(track => '-map 0:' + track.n + ' -c copy ' + this.folder + track.file).join(' '));
    }

    sendProgress(time:number) {
        this.socket.emit('progress', {
            time: Math.min(time, this.duration),
            progress: Math.min(time / this.duration, 1)
        });
    }

    startFFmpeg() {
        spawn(`ffmpeg -y -ss ${this.startTime} -i http://localhost:1338/${this.sid} -c copy -map 0 ${this.inputFile}`,
            (data, cp) => {
                this.stdout += data;
                var t:string[] = data.match(/time=(\d+):(\d+):(\d+\.\d+)/) || [];
                var time = +t[1] * 3600 + +t[2] * 60 + +t[3];
                if (time > 0) {
                    this.currentTime = time;
                    this.sendProgress(time);
                    if (time > this.duration) {
                        cp.kill();
                    }
                }
            }, this.timeout).catch(err => this.closeWithError(err));
    }

    done() {
        this.track = mediaInfo(this.stdout);
        this.extract().then(data => {
            this.socket.emit('done', this.track);
        }).catch(err => this.closeWithError(err));
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
        return this.videoServer[id];
    }

    closeWithError(err:Error) {
        console.error(err);
        this.socket.emit('error', {});
    }
}

class SessionStore {
    sessions:{[sid: string]: Session} = {};

    get(sid:string) {
        var session = this.sessions[sid];
        if (!session) {
            console.error(new Error(`Sid: ${sid} not found`));
            return null;
        }
        if (session.isDone) {
            session.closeWithError(new Error('Session is done'));
            return null;
        }
        return session;
    }

    create(data:any, socket:any) {
        var session = new Session(data, socket);
        this.sessions[session.sid] = session;
        return session;
    }
}
export var sessions = new SessionStore();