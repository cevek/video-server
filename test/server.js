'use strict';
var co = require('co');
var fs = require('fs');
var koa = require('koa');
var router = require('koa-router')();
var cors = require('koa-cors');
var http = require('http');
var koaBody = require('koa-body');
var app = koa();


function createSession(data) {
    var sid = Math.random().toString(33).substr(3, 5);
    var session = {
        sid: sid,
        startTime: 0,
        duration: 0,
        activeVideoStreams: 0,
        size: 0,
        waitResolve: null,
        parts: [],
        currentTime: 0,
        stdout: '',

        socket: null,
        videoServer: {},
    };
    session.size = data.size;
    session.filename = data.filename;
    session.fileExt = data.filename.split('.').pop();
    session.duration = data.duration;
    session.startTime = data.startTime;

    sessions[sid] = session;
    return session;
}

function getSession(sid) {
    return sessions[sid];
}

var sessions = {};

var ContentType = {
    SUBS: 'subs',
    AUDIO: 'audio',
    VIDEO: 'video'
};


function mediaInfo(stdout) {
    var res = stdout.match(/Duration: (\d+):(\d+):(\d+)/) || [0, 0, 0, 0];
    var track = {streams: []};
    track.duration = +res[1] * 3600 + +res[2] * 60 + +res[3];

    var streams = stdout.match(/Stream \#.*\n(\s+Metadata:\n(\s{5,}.*\n)*)?/g) || [];
    for (var i = 0; i < streams.length; i++) {
        var m = streams[i].replace(/\s+/g, ' ').match(/Stream \#0.(\d+)(\((.*?)\))?: ((Video): (.*?), .*?, (\d+x\d+)|(Audio): (.*?), .*?, (.*?), (.*? title : (.*?) $)?|(Subtitle): (.*? title : (.*?) $)?)/) || [];
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
    console.log(track);
    return track;
}

function startFFmpeg(session) {
    var ls = require('child_process').spawn('ffmpeg', ['-y', '-ss', session.startTime, '-i', 'http://localhost:1338/' + session.sid, '-acodec', 'copy', '-vcodec', 'copy', '-scodec', 'copy', '-map', '0', '123.' + session.fileExt]);
    ls.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });

    ls.stderr.on('data', function (data) {
        session.stdout += data.toString();
        var t = data.toString().match(/time=(\d+):(\d+):(\d+\.\d+)/) || [];
        var time = +t[1] * 3600 + +t[2] * 60 + +t[3];
        console.log('stderr: ' + data);
        if (time > 0) {
            console.log('time: ', time);
            session.currentTime = time;
            session.socket.emit('progress', {
                time: Math.min(time, session.duration),
                progress: Math.min(time / session.duration, 1)
            });
            if (!session.track) {

            }
            if (time > session.duration) {
                ls.kill();
            }
        }
    });

    ls.on('close', function (code) {
        console.log('child process exited with code ' + code);
    });
}

var io = require('socket.io')(7878);
io.on('connection', function (socket) {
    socket.on('start-upload', (data, callback) => {
        var session = createSession(data);
        console.log("start-upload", data);
        startFFmpeg(session);
        session.socket = socket;
        callback(session.sid);
    });

    socket.on('data', (data, callback) => {
        var session = getSession(data.sid);
        //console.log("data", data);
        var videoRes = session.videoServer[data.id].res;
        if (videoRes.writable) {
            videoRes.write(data.file);
        }
        callback(true);
    });
});
/*

router.get('/', function* () {
    this.body = 'Hello World!';
});

router.post('/uploadpart', function* () {
    session.req = this.request;
    session.size = this.request.query.size;
    console.log(this.request.query);
    console.log(this.request.body);
    var file = this.request.body.files.file;
    var data = fs.readFileSync(file.path);

    var videoRes = session.videoServer[id].res;
    if (videoRes.writable) {
        videoRes.write(data);
    }
    this.body = {};
});

app.use(koaBody({multipart: true, formidable: {uploadDir: __dirname}}));
app.use(cors({credentials: true}));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(1335);
app.on('error', function (err) {
    console.error('App Error');
    console.error(err);
    console.error(err.stack);
});
console.log("serving localhost:1335");
*/


http.createServer(function (req, res) {
    console.log("connected", req.headers);
    var session = getSession(req.url.split('/').pop());
    session.activeVideoStreams++;
    req.on('close', function (res, socket, upgradeHead) {
        session.activeVideoStreams--;
        if (session.activeVideoStreams === 0) {
            var track = mediaInfo(session.stdout);
            console.log(session.stdout);
            session.socket.emit('done', track);
        }
        console.log('close');
        session.socket.emit('close', {id: req.socket._id});
    });
    var total = session.size;
    if (req.headers['range']) {
        var range = req.headers.range;

        var parts = range.replace(/bytes=/, "").split("-");
        var partialstart = parts[0];
        var partialend = parts[1];

        var start = parseInt(partialstart, 10);
        var end = partialend ? parseInt(partialend, 10) : total - 1;
        var chunksize = (end - start) + 1;
        //console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize
            //'Content-Type': 'video/mp4'
        });
    } else {
        //console.log('ALL: ' + total);
        start = 0;
        res.writeHead(200, {'Content-Length': session.size});
    }

    var id = Math.random().toString(33).substr(2, 5);
    req.socket._id = id;
    session.videoServer[id] = {req: req, res: res};
    if (start < session.size) {
        console.log("data-need", start);
        session.socket.emit('data-need', {id: id, start: start});
    }
    else {
        console.error('data-need over size');
    }
}).listen(1338, '127.0.0.1');