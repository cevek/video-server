"use strict";

import * as http from 'http';
import {sessions} from "./session";

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