'use strict';
require('source-map-support').install();

import * as http from 'http';
import * as IO from 'socket.io';
import * as fs from 'fs';
import {exec} from "./utils";
import {MediaInfo, mediaInfo} from "./media-info";
import {sessions} from "./session";

const io = IO(7878);
io.on('connection', socket => {
    socket.on('start-upload', (data:any, callback:(sid:string)=>void) => {
        const session = sessions.create(data, socket);
        session.startFFmpeg();
        callback(session.sid);
    });

    socket.on('data', (data:{id: string; file: Buffer; sid: string}, callback:(result:boolean)=>void) => {
        const session = sessions.get(data.sid);
        if (session) {
            const con = session.getVideoConnection(data.id);
            if (con) {
                const videoRes = con.res;
                if (videoRes.writable) {
                    videoRes.write(data.file);
                    return callback(true);
                }
            }
        }
        return callback(false);
    });
});

http.createServer((req, res) => {
    const sid = req.url.split('/').pop();
    const session = sessions.get(sid);
    if (session) {
        const total = session.size;
        let start = 0;
        if (req.headers['range']) {
            const parts = req.headers.range.replace(/bytes=/, '').split('-');
            start = +parts[0];
            const end = parts[1] ? +parts[1] : total - 1;
            const chunkSize = (end - start) + 1;
            res.writeHead(206, {
                'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize
            });
        }
        else {
            res.writeHead(200, {'Content-Length': total});
        }

        if (start < total) {
            const id = session.createConnection(start, res);
            req.on('close', () => session.closeConnection(id));
        }
        else {
            session.closeWithError(new Error('data-need over size'));
        }
    }
}).listen(1338, '127.0.0.1');