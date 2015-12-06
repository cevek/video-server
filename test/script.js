"use strict";


if (!XMLHttpRequest.prototype.sendAsBinary) {
    XMLHttpRequest.prototype.sendAsBinary = function (datastr) {
        var arr = new Uint8ClampedArray(datastr.length);
        for (var i = 0; i < datastr.length; i++) {
            arr[i] = datastr[i];
        }
        this.send(arr.buffer);
    }
}

var url = 'http://localhost:1335/uploadpart';

var input = document.createElement('input');
input.setAttribute("type", "file");
document.body.appendChild(input);
input.onchange = function () {
    UploadPortion(input);
};

function UploadPortion(inputFile, url, from, end) {
    return new Promise((resolve, reject) => {
        var file = inputFile.files[0];
        var info = {
            startTime: Math.random() * 5000 | 0,
            duration: 10,//(Math.random() * 300 | 0) + 60,
            filename: file.name,
            size: file.size
        };
        console.log(info);
        console.time('process');
        socket.emit('start-upload', info, _sid => sid = _sid);
        socket.on('close', data => {
            stopStream(data.id);
        });
        socket.on('data-need', data => {
            sendStream(file, data.start, data.id);
        });
        socket.on('done', data => {
            console.timeEnd('process');

            console.log("done", data);
        });
        socket.on('progress', data => {
            console.log("progress", data);
        });
        socket.on('error', err => {
            console.error(err);
        })
    });
}


var streams = {};
var sid = null;
function stopStream(id) {
    console.log("stopStream", id);
    streams[id] = false;
}

function sendStream(file, start, id, partSize) {
    if (!partSize) {
        partSize = 10000;
    }
    partSize = Math.min(partSize, 1000000);

    console.log("sendStream", start, id);
    streams[id] = true;
    var reader = new FileReader();
    var end = Math.min(start + partSize, file.size);
    if (end - start > 0) {
        reader.readAsArrayBuffer(file.slice(start, end));
        reader.onloadend = e => {
            if (e.target.readyState == FileReader.DONE) {
                socket.emit('data', {
                    sid: sid,
                    start: start,
                    id: id,
                    size: e.target.result.length,
                    file: e.target.result
                }, () => {
                    if (streams[id]) {
                        sendStream(file, start + partSize, id, partSize * 2);
                    }
                });
            }
        };
    }
}

var socket = io.connect('http://localhost:7878');


