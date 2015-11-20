/// <reference path='typings/node/node.d.ts' />
'use strict';

var fs = require('fs');
var config = require('./config').config;

type Data = any;

export var uploadSessions:{[user:string]:Uploader} = {};

class UploaderSessions {
    sessions:{[sid:string]: Uploader} = {};

    create() {
        var sid = Math.random().toString(33).substr(2, 5);
        var uploader = new Uploader(sid);
        this.sessions[sid] = uploader;
        return uploader;
    }

    remove(sid:string) {
        if (!this.sessions[sid]) {
            throw new Error('sid not found: ' + sid);
        }
        this.sessions[sid].destroy();
        this.sessions[sid] = null;
    }

    getUploaderBySid(sid:string) {
        if (!this.sessions[sid]) {
            throw new Error('sid not found: ' + sid);
        }
        return this.sessions[sid];
    }
}

export var uploaderSessions = new UploaderSessions();

async function exec(command:string, options?:{timeout?:number}) {
    return await new Promise<string>((resolve, reject) =>
        require('child_process').exec(command, options, (err:any,
            stdout:any,
            stderr:any) => err ? reject(err) : resolve(stdout.toString() + stderr.toString())));
}

enum ContentType{
    VIDEO,
    AUDIO,
    EN_AUDIO,
    RU_AUDIO,
    SUBS,
    EN_SUBS,
    RU_SUBS
}

class BaseContent {
    fd:number;
    basetype:ContentType;
    type:ContentType;
    source = 0; // [0=none 1=>file <0=>videoStream]
    start = 0;
    end = 0;
    selectDuration = 0;
    duration = 0;
    videoStream = 0;
    file = '';
    filesize = 0;
    parts:number[][] = [];
    startpos = 0;
    endpos = 0;
    streams:{type:ContentType; format?:string; aid?: number; size?: {w:number; h:number}; lang?: string; title?: string; channels?: number}[];
}
class VideoContent extends BaseContent {
    baseType = ContentType.VIDEO;
    type = ContentType.VIDEO;
}
class AudioContent extends BaseContent {
    baseType = ContentType.AUDIO;

    constructor(public type:ContentType) {
        super();
    }
}
class SubsContent extends BaseContent {
    baseType = ContentType.SUBS;

    constructor(public type:ContentType) {
        super();
    }
}

export class Uploader {
    time = new Date();
    processDir = config.processDir;
    dataDirVideo = config.dataDirVideo;
    dataDir = '';
    status = 0;
    video = new VideoContent();
    enAudio = new AudioContent(ContentType.EN_AUDIO);
    ruAudio = new AudioContent(ContentType.RU_AUDIO);
    enSub = new SubsContent(ContentType.EN_SUBS);
    ruSub = new SubsContent(ContentType.RU_SUBS);

    constructor(public sid:string) {
    }

    getType(type:ContentType):BaseContent {
        switch (type) {
            case ContentType.VIDEO:
                return this.video;
            case ContentType.EN_AUDIO:
                return this.enAudio;
            case ContentType.RU_AUDIO:
                return this.ruAudio;
            case ContentType.EN_SUBS:
                return this.enSub;
            case ContentType.RU_SUBS:
                return this.ruSub;
        }
    }

    async destroy() {

    }

    async init() {
        this.dataDir = config.dataDir + this.sid + '/';
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir);
        } else {
            await exec('rm ' + this.dataDir + '*');
        }
    }

    async getInfo(data:Data) {
        try {
            data = JSON.parse(data) || {}
        }
        catch (e) {
            console.error(e);
        }

        this.validateContent(this.video, data.video);
        this.validateContent(this.ruAudio, data.ruAudio);
        this.validateContent(this.enAudio, data.enAudio);
        this.validateContent(this.ruSub, data.ruSub);
        this.validateContent(this.enSub, data.enSub);

        return {
            video: await this.getMediaPos(this.video),
            enAudio: await this.getMediaPos(this.enAudio),
            ruAudio: await this.getMediaPos(this.ruAudio),
        };
    }

    validateContent(track:BaseContent, data:Data) {
        if (!(track instanceof VideoContent) && track.source < 0) {
            var stream = -1 * track.source;
            if (this.video.streams[stream].type == track.basetype) {
                track.videoStream = stream;
                track.duration = this.video.duration;
                track.selectDuration = this.video.selectDuration;
                track.start = this.video.start;
                track.end = this.video.end;
            }
            else {
                track.source = 0;
            }
        }

        track.source = +data.source;
        track.start = Math.min(Math.max(0, +data.start), track.duration);
        track.end = Math.min(Math.max(track.start, +data.end), track.duration);
        track.selectDuration = track.end - track.start;
        // check duration
        //video && enAudio && enSub && ruSub || enSub && ruSub

    }

    async makeFile(track:BaseContent, filesize:number) {
        console.log(filesize);
        if (filesize < 1000 || filesize > 5 * 1000 * 1000 * 1000) {
            return false;
        }

        track.filesize = filesize;
        track.parts = [];
        track.file = this.dataDir + track.type;
        /*
                if (track instanceof VideoContent) {
                    track.file = this.dataDirVideo + track.type;
                }
        */
        console.log(this);

        if (fs.existsSync(track.file)) {
            fs.unlinkSync(track.file);
        }

        await exec('fallocate -l ' + track.filesize + ' ' + track.file);
        console.log('created file', track.file);
        track.fd = fs.openSync(track.file, 'r+');
        //if (type == 'video')
        //fs.writeSync(track.fd, new Buffer('x'), 0, 1, track.filesize-1);
        return true;
    }

    async uploadPart(params:{type: ContentType; from: number; makefile: boolean; filesize: number}, data:Buffer) {
        var track = this.getType(params.type);
        var from = +params.from;
        var size = data.length;
        if (from < 0 || from + size > track.filesize) {
            return;//this.destroy('!!from');
        }

        if (params.makefile || !track.fd) {
            this.makeFile(track, +params.filesize);
        }
        console.log('upload', from, data.length);
        fs.writeSync(track.fd, data, 0, data.length, from);
        track.parts.push([from, from + size, size]);
        //return removeUploadSession(ssn, '!makefile');
    }

    needToLoad(tracedata:string, loadedparts:number[][], filesize:number, isffmpeg = false) {
        var last_seek = 0;
        var all_seeks:number[] = [];
        var m:string[] = tracedata.match(/Read error at pos. \d+/g);
        //console.log(tracedata, m);
        for (var j in m) {
            var m2:string[] = m[j].match(/(\d+)/) || [];
            all_seeks.push((+m2[1] | 0));
        }

        var n = (isffmpeg ? 3 : 4);
        var m:string[] = tracedata.match(/(_llseek\(\d, \d+|read\(\d,.*? = \d+$)/gm);
        //.replace(/^[\s\S]*?_llseek\(\d, 0/, '')
        for (var j in m) {
            var m2:string[] = m[j].match(/(seek\(\d, (\d+)|= (\d+))/) || [];
            if (m2[2]) {
                last_seek = +m2[2];
                all_seeks.push(last_seek);
            }
            if (m2[3]) {
                all_seeks.push(last_seek);
                last_seek += +m2[3];
            }
        }

        var seeks:number[] = [];
        for (var i = 0; i < all_seeks.length; i++) {
            if (all_seeks[i] >= filesize) {
                continue;
            }
            var notfound = true;
            for (var k = 0; k < loadedparts.length; k++) {
                if (loadedparts[k][0] <= all_seeks[i] && all_seeks[i] < loadedparts[k][1]) {
                    notfound = false;
                    break;
                }
            }
            if (notfound) {
                seeks.push(all_seeks[i]);
            }

            last_seek += +m2[3];
        }

        //console.log('#####################3');
        //console.log('seeks', seeks);
        //console.log('all_seeks', all_seeks);
        //console.log('loadedparts', loadedparts);
        return seeks[0] || 0;
    }

    async getMediaInfo(params: {type: ContentType}) {
        console.log('getmediainfo');
        var track = this.getType(params.type);


        var stdout = await exec('strace -e_llseek,read avconv -ss 0.1 -i ' + track.file + ' -t 0 2>&1', {timeout: 2000});
        /*
         console.log('err', err);
         console.log('stdout', stdout);
         console.log('stderr', stderr);
         //return;
         */

        //console.log(stdout);
        //stdout = stdout.split(/Output #0/).shift();

        var loadfrom = this.needToLoad(stdout, track.parts, track.filesize, true);
        loadfrom = Math.max(0, loadfrom - 200000);

        var res = stdout.match(/Duration: (\d+):(\d+):(\d+)/) || [0, 0, 0, 0];
        track.duration = +res[1] * 3600 + +res[2] * 60 + +res[3];

        var streams:string[] = stdout.match(/Stream \#.*\n(\s+Metadata:\n(\s{5,}.*\n)*)?/g) || [];
        for (var i = 0; i < streams.length; i++) {
            var m:string[] = streams[i].replace(/\s+/g, ' ').match(/Stream \#0.(\d+)(\((.*?)\))?: ((Video): (.*?), .*?, (\d+x\d+)|(Audio): (.*?), .*?, (.*?), (.*? title : (.*?) $)?|(Subtitle): (.*? title : (.*?) $)?)/) || [];
            var k = +m[1];
            if (!track.streams[k]) {
                if (m[5]) {
                    var m2 = (m[7] || '').match(/(\d+)x(\d+)/);
                    var size = {w: +m2[1], h: +m2[2]};
                    track.streams[k] = {type: ContentType.VIDEO, format: m[6] || '', size: size};
                }
                if (m[8]) {
                    var channels = (m[10].match(/5.1/) ? 6 : (m[10].match(/mono/) ? 1 : 2) );
                    track.streams[k] = {
                        type: ContentType.AUDIO,
                        lang: m[3] || '',
                        format: m[9] || '',
                        channels: channels,
                        title: m[12] || ''
                    };
                }
                if (m[13]) {
                    track.streams[k] = {type: ContentType.SUBS, lang: m[3] || '', title: m[15] || ''};
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

        //console.log(streams, sinfo);
        console.log(loadfrom);

        return {streams: track.streams, duration: track.duration, loadfrom: loadfrom};
    }

    async getMediaPos(track:BaseContent) {
        var stdout = await exec('strace -e_llseek mencoder ' + track.file + ' -ss ' + (track.start - 10) + ' -endpos 0 -oac pcm -ovc copy -o null 2>&1');
        //console.log('start', stdout);
        var startpos = this.needToLoad(stdout, track.parts, track.filesize);
        track.startpos = startpos;
        var stdout = await exec('strace -e_llseek mencoder ' + track.file + ' -ss ' + (track.end + 10) + ' -endpos 0 -oac pcm -ovc copy  -o null 2>&1');
        //console.log('end', stdout);
        console.log('filesize', fs.statSync(track.file).size);
        var endpos = this.needToLoad(stdout, track.parts, track.filesize);
        track.endpos = endpos;
        //console.log('loaded parts', track.parts);
        console.log(startpos, endpos);
        return {startpos: startpos, endpos: endpos};

    }
}

