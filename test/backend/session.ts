import {uploadsDAO} from "./models/upload";
"use strict";
var co = require('co');
import {mkdirSync} from "fs";
import {writeFileSync} from "fs";
import {upload} from "./youtube/upload";
import {ContentType} from "./media-info";
import {config} from "./config";
import {MediaInfo} from "./media-info";
import {mediaInfo} from "./media-info";
import {exec} from "./utils";
import {spawn} from "./utils";
import {db} from "./db";
import {mediaFilesDAO} from "./models/media-file";
import {Upload} from "./interfaces/upload";
import {TrackInfo} from "./interfaces/track-info";

//import {spawn} from 'child_process';

export class Session {
    sid = (Date.now() / 1000 | 0) + '_' + Math.random().toString(33).substr(3, 5);
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
    streamsMeta:{id: string; url: string; file: string}[] = [];
    duration:number;
    startTime:number;
    socket:{emit: (name:string, obj:any)=>void};
    timeout = 10 * 60; // 10 min timeout;
    //todo: add check
    maxParts = 100;
    youtubeId:string;
    isDone = false;
    isVideo = false;
    isAudio = false;
    isSub = false;

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
        if (this.fileExt.match(/\.(avi|mp4|m4v|mkv|webm|flv|wmv|mpg)$/i)) {
            this.isVideo = true;
        }
        else if (this.fileExt.match(/\.(mp3|m4a|ac3|aac|ogg|wav|wma|webm|flac)$/i)) {
            this.isAudio = true;
        }
        else if (this.fileExt.match(/\.(srt|sub)$/i)) {
            this.isSub = true;
        }
        console.log(data);
        mkdirSync(this.folder);
    }

    emit(name:string, data:any) {
        this.socket.emit(name + '-' + this.sid, data);
    }

    extract() {
        return exec('ffmpeg -y -i ' + this.inputFile + ' ' +
            this.track.streams.map(track => {
                var audioParams = track.type == ContentType.AUDIO ? ` -vn -sn -c:a libfdk_aac -profile:a aac_he_v2 -ac 2 -b:a 32k ${track.channels > 2 ? `-map_channel 0.${track.n}.2` : ''}` : '';
                return '-c copy -map 0:' + track.n + audioParams + ' ' + this.streamsMeta[track.n].file;
            }).join(' '));
    }

    sendProgress(time:number) {
        this.emit('progress', {
            time: Math.min(time, this.duration),
            progress: Math.min(time / this.duration, 1)
        });
    }

    prepareMediaInfo() {
        var video:TrackInfo;
        var audio:TrackInfo[] = [];
        var subs:TrackInfo[] = [];

        for (var i = 0; i < this.track.streams.length; i++) {
            var stream = this.track.streams[i];
            var id = Math.random().toString(33).substr(2, 5);
            var item = {id: id, title: stream.title, lang: stream.lang, url: this.streamsMeta[i].url};
            if (stream.type == ContentType.VIDEO) {
                video = item;
            }
            else if (stream.type == ContentType.AUDIO) {
                audio.push(item);
            }
            else if (stream.type == ContentType.SUBS) {
                subs.push(item);
            }
        }
        return {video, audio, subs};
    }

    getMediaInfo() {
        if (!this.track) {
            this.track = mediaInfo(this.stdout);
            if (this.track) {
                for (var i = 0; i < this.track.streams.length; i++) {
                    var stream = this.track.streams[i];
                    if (stream.type == ContentType.VIDEO) {
                        var ext = 'mp4';
                    }
                    else if (stream.type == ContentType.AUDIO) {
                        ext = 'aac';
                    }
                    else if (stream.type == ContentType.SUBS) {
                        ext = 'srt';
                    }
                    this.streamsMeta[i] = {
                        id: Math.random().toString(33).substr(2, 5),
                        file: this.folder + stream.n + '.' + ext,
                        url: '/files/' + this.sid + '/' + stream.n + '.' + ext
                    };
                }

                this.emit('info', this.prepareMediaInfo());
            }
        }
    }

    processTime(data:string) {
        var t:string[] = data.match(/time=(\d+):(\d+):(\d+\.\d+)/) || [];
        var time = +t[1] * 3600 + +t[2] * 60 + +t[3];
        if (time > 0) {
            this.currentTime = time;
            this.sendProgress(time);
            return time < this.duration;
        }
        return true;
    }

    startFFmpeg() {
        //console.log("startFFmpeg");

        spawn(`ffmpeg -y -ss ${this.startTime} -i http://localhost:1338/${this.sid} -c copy -map 0 ${this.inputFile}`,
            (data, cp) => {
                this.stdout += data;
                this.getMediaInfo();
                var time = this.processTime(data);
                if (!time) {
                    //console.log("kill");
                    cp.kill();
                }
            }, this.timeout).catch(err => this.closeWithError(err));
    }

    extractThumbs() {
        //console.log("ExtractThumbs");

        var fld = this.folder;
        return exec(`ffmpeg -y -i ${this.inputFile} -qscale 1 -vsync 1 -r 1 ${fld}_raw%03d.jpg`).then(()=>
            exec(`convert ${fld}_raw*.jpg -thumbnail 200x100^ -auto-level -level 0,60%% -modulate 100,70 ${fld}_thumb.jpg`).then(() =>
                exec(`montage ${fld}_thumb*.jpg  -tile 20x -geometry +0+0 -gravity north ${fld}thumbs.jpg`).then(() =>
                    exec(`rm ${fld}_*.jpg`))));
    }

    done() {
        this.isDone = true;
        this.emit('upload-done', {});
        //console.log("done");

        Promise.all([
            //todo: what if only audio?
            upload(this.sid, this.inputFile),
            this.isVideo ? this.extractThumbs() : null,
            this.extract()
        ]).then((res) => {
            var youtube = this.youtubeLink(res[0]);
            writeFileSync(this.folder + 'youtube.txt', youtube);
            this.emit('done', this.prepareMediaInfo());
        }).then(()=>co(async ()=> {
            var that = this; // todo: fix that
            await db.transaction(async (trx) => {
                await uploadsDAO.create({id: this.sid, info: this.stdout}, trx);
                await mediaFilesDAO.createBulk(that.track.streams.map((track, i) => {
                    var str = that.streamsMeta[i];
                    return {
                        id: str.id,
                        startTime: that.startTime,
                        duration: that.duration,
                        type: track.type,
                        info: JSON.stringify(track),
                        uploadId: that.sid,
                        filename: str.file
                    }
                }), trx);
            });
        })).catch(err => this.closeWithError(err));
    }

    closeConnection(id:string):void {
        this.emit('close', {id: id});
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
        this.emit('data-need', {id: id, start: start});
        return id;
    }

    getVideoConnection(id:string) {
        return this.videoServer[id];
    }

    closeWithError(err:Error) {
        this.emit('err', err.message);
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
        var url = 'https://www.youtube.com/watch?v=' + id;
        this.streamsMeta[0].url = url;
        return url;
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

