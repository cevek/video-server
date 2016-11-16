'use strict';
import * as IO from 'socket.io';
import {sessions} from "./session";

const io = IO(7878);
io.on('connection', socket => {
    socket.on('start-upload', (data:any, callback:(sid:number)=>void) => {
        const session = sessions.create(data, socket);
        if (session) {
            session.startFFmpeg();
            callback(session.sid);
            console.log("AFS");
        }
        else {
            callback(0);
        }
    });

    socket.on('data', (data:any, callback:(result:boolean)=>void) => {
        const session = sessions.get(data.sid);
        if (session) {
            callback(session.onPart(data));
        }
        else {
            callback(false);
        }
    });
});
