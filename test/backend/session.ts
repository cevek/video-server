"use strict";
import {uploadsDAO} from "./models/upload";
var co = require('co');
import {mkdirSync} from "fs";
import {writeFileSync} from "fs";
import {upload} from "./youtube/upload";
import {config} from "./config";
import {MediaInfo} from "./media-info";
import {mediaInfo} from "./media-info";
import {exec} from "./utils";
import {spawn} from "./utils";
import {db} from "./db";
import {mediaFilesDAO} from "./models/media-file";
import {Upload} from "./interfaces/upload";
import {TrackInfo} from "./interfaces/track-info";
import {genId} from "./utils";
import {MediaFile} from "./interfaces/media-file";
import {MediaType} from "./interfaces/media-types";

//import {spawn} from 'child_process';

//todo: what if video blocked?
export class Session {
    sid = genId();
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
    subtitlesShift:number;
    socket:{emit: (name:string, obj:any)=>void};
    timeout = 10 * 60; // 10 min timeout;
    //todo: add check
    maxParts = 100;
    youtubeId:string;
    isDone = false;
    isVideo = false;
    isAudio = false;
    isSub = false;

    constructor(data:{size: number; filename: string; endTime: string; startTime: string}, socket:any) {
        //todo: check all props
        this.socket = socket;
        this.size = data.size;
        this.filename = data.filename;
        this.fileExt = data.filename.split('.').pop();
        this.folder = config.dir + this.sid + '/';
        this.inputFile = this.folder + 'input.' + this.fileExt;
        this.startTime = this.timeToSec(data.startTime);
        this.duration = this.timeToSec(data.endTime) - this.startTime;

        if (this.fileExt.match(/^(avi|mp4|m4v|mkv|webm|flv|wmv|mpg)$/i)) {
            this.isVideo = true;
        }
        else if (this.fileExt.match(/^(mp3|m4a|ac3|aac|ogg|wav|wma|webm|flac)$/i)) {
            this.isAudio = true;
        }
        else if (this.fileExt.match(/^(srt|sub)$/i)) {
            this.isSub = true;
        }
        else {
            console.error('Ext is not recognized');
        }
        console.log(data);
        mkdirSync(this.folder);
    }

    timeToSec(time:string) {
        var t = time.match(/^(\d+):(\d+):(\d+)$/);
        return t ? (+t[1] * 3600 + +t[2] * 60 + +t[3]) : null;
    }

    emit(name:string, data:any) {
        this.socket.emit(name + '-' + this.sid, data);
    }

    async extract() {
        console.log("Extract");
        var s = await exec('ffmpeg -y -i ' + this.inputFile + ' ' +
            this.track.streams.map(track => {
                var audioParams = track.type == MediaType.AUDIO ? ` -vn -sn -c:a libfdk_aac -profile:a aac_he_v2 -ac 2 -b:a 32k ${track.channels > 2 ? `-map_channel 0.${track.n}.2` : ''}` : '';
                return '-c copy -map 0:' + track.n + audioParams + ' ' + this.streamsMeta[track.n].file;
            }).join(' '));
        var m = s.match(/Duration: [\d:.]+, start: ([\d.]+)/);

        if (m) {
            this.subtitlesShift = +m[1];
        }
        else {
            //todo: need rethink
            // get first time
            this.subtitlesShift = this.parseTime(s);
        }
        console.log("subtitlesShift", this.subtitlesShift);
        return s;
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
            var item = {
                id: this.streamsMeta[i].id,
                title: stream.title,
                lang: stream.lang,
                url: this.streamsMeta[i].url,
                type: stream.type,
            };
            if (stream.type == MediaType.VIDEO) {
                video = item;
            }
            else if (stream.type == MediaType.AUDIO) {
                audio.push(item);
            }
            else if (stream.type == MediaType.SUBS) {
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
                    if (stream.type == MediaType.VIDEO) {
                        var ext = 'mp4';
                    }
                    else if (stream.type == MediaType.AUDIO) {
                        ext = 'aac';
                    }
                    else if (stream.type == MediaType.SUBS) {
                        ext = 'srt';
                    }
                    this.streamsMeta[i] = {
                        id: genId(),
                        file: this.folder + stream.n + '.' + ext,
                        url: this.sid + '/' + stream.n + '.' + ext
                    };
                }

                this.emit('info', this.prepareMediaInfo());
            }
        }
    }

    parseTime(data: string){
        var t:string[] = data.match(/time=(-?)(\d+):(\d+):(\d+\.\d+)/) || [];
        var time = (t[1] ? -1 : 1) * (+t[2] * 3600 + +t[3] * 60 + +t[4]);
        if (time >= 0) {
            return time;
        }
        return 0;
    }

    processTime(data:string) {
        var time = this.parseTime(data);
        if (time > 0) {
            this.currentTime = time;
            this.sendProgress(time);
            return time < this.duration;
        }
        return true;
    }

    startFFmpeg() {
        //console.log("startFFmpeg");
        return co(async () => {
            try {
                await spawn(`ffmpeg -y -ss ${this.startTime} -i http://localhost:1338/${this.sid} -c copy -map 0 ${this.inputFile}`,
                    (data, cp) => {
                        this.stdout += data;
                        this.getMediaInfo();
                        var time = this.processTime(data);
                        if (!time) {
                            //console.log("kill");
                            cp.kill();
                        }
                    }, this.timeout);

                if (!this.track) {
                    throw new Error('Track is empty');
                }
            }
            catch (e) {
                this.closeWithError(e)
            }
        });
    }

    async extractThumbs() {
        console.log("ExtractThumbs");
        var fld = this.folder;
        await exec(`ffmpeg -y -i ${this.inputFile} -qscale 1 -vsync 1 -r 1 ${fld}_raw%03d.jpg`);
        await exec(`convert ${fld}_raw*.jpg -thumbnail 200x100^ -auto-level -level 0,60%% -modulate 100,70 ${fld}_thumb.jpg`);
        await exec(`rm ${fld}_*.jpg`);
    }

    done() {
        return co(async ()=> {
            try {
                this.isDone = true;
                this.emit('upload-done', {});
                console.log("done", this.isVideo);
                var videoId = this.isVideo ? this.streamsMeta[0].id : null;

                //todo: what if only audio?
                //todo: parallel

                var res = await ([
                    this.isVideo ? upload(this.sid, this.inputFile) : null,
                    this.isVideo ? this.extractThumbs() : null,
                    this.extract()
                ]);

                if (this.isVideo) {
                    var ytLink = res[0];
                    var youtube = this.youtubeLink(ytLink);
                    writeFileSync(this.folder + 'youtube.txt', youtube);
                }

                this.emit('done', this.prepareMediaInfo());

                await db.transaction(async (trx) => {
                    await uploadsDAO.create({id: this.sid, info: this.stdout}, trx);
                    var mediaFiles:MediaFile[] = this.track.streams.map((track, i) => {
                        var str = this.streamsMeta[i];
                        return {
                            id: str.id,
                            startTime: this.startTime,
                            duration: this.duration,
                            type: track.type,
                            info: JSON.stringify(Object.assign(track, {subtitlesShift: this.subtitlesShift})),
                            uploadId: this.sid,
                            url: str.url,
                            filename: str.file,
                            videoFile: videoId,
                        }
                    });
                    if (this.isVideo) {
                        mediaFiles.push({
                            id: genId(),
                            startTime: this.startTime,
                            duration: this.duration,
                            videoFile: videoId,
                            filename: this.folder + 'thumbs.jpg',
                            url: this.sid + '/thumbs.jpg',
                            info: null,
                            uploadId: this.sid,
                            type: MediaType.THUMBS
                        });
                    }
                    await mediaFilesDAO.createBulk(mediaFiles, trx);
                });
            }
            catch (e) {
                this.closeWithError(e);
            }
        });
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

