"use strict";
import {mkdirSync} from "fs";
import {writeFileSync} from "fs";
import {upload} from "./youtube/upload";
import {ContentType} from "./media-info";
import {config} from "./config";
import {MediaInfo} from "./media-info";
import {mediaInfo} from "./media-info";
import {exec} from "./utils";
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
    //todo: add check
    maxParts = 100;
    youtubeId:string;
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
        mkdirSync(this.folder);
    }

    extract() {
        return exec('ffmpeg -y -i ' + this.inputFile + ' ' +
            this.track.streams.map(track => {
                var audioParams = track.type == ContentType.AUDIO ? ' -vn -sn -c:a libfdk_aac -profile:a aac_he_v2 -ac 2 -b:a 32k -map_channel 0.' + track.n + '.2' : '';
                var ext = track.type == ContentType.VIDEO ? 'mp4' : (track.type == ContentType.AUDIO ? 'aac' : 'srt');
                return '-c copy -map 0:' + track.n + audioParams + ' ' + this.folder + track.n + '.' + ext;
            }).join(' '));
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
        this.isDone = true;
        this.track = mediaInfo(this.stdout);
        this.socket.emit('upload-done', {});
        Promise.all([
            //todo: what if only audio?
            upload(this.sid, this.inputFile),
            this.extract()
        ]).then((res) => {
            var youtube = this.youtubeLink(res[0]);
            writeFileSync(this.folder + 'youtube.txt', youtube);
            this.socket.emit('done', {track: this.track, youtube: youtube});
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
        this.socket.emit('err', err.message);
        console.error(err);
        console.error(err.stack);
    }

    onPart(data:{id: string, file: Buffer, sid: string}) {
        const con = this.getVideoConnection(data.id);
        if (con) {
            const videoRes = con.res;
            if (videoRes.writable) {
                videoRes.write(data.file);
                return true;
            }
        }
        return false;
    }

    youtubeLink(id:string) {
        this.youtubeId = id;
        return 'https://www.youtube.com/watch?v=' + id;
    }
}

class SessionStore {
    sessions:{[sid: string]: Session} = {};

    get(sid:string):Session {
        var session = this.sessions[sid];
        if (!session) {
            console.error(new Error(`Sid: ${sid} not found`));
            return null;
        }
        if (session.isDone) {
            //session.closeWithError(new Error('Session is done'));
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