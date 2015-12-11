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

var progressInput = document.createElement('meter');
document.body.appendChild(progressInput);

var input = document.createElement('input');
input.setAttribute("type", "file");
document.body.appendChild(input);
input.onchange = function () {
    UploadPortion(input);
};

var startTime = 0;
var startExtractTime = 0;
var preDuration = 5;
var preSize = 0.2;
var middleSize = 0.6;
var endSize = 0.2;
var progress = 0;
var uploadDone = false;
var extractDone = false;

function UploadPortion(inputFile, url, from, end) {
    startTime = Date.now();

    calcProgress();

    return new Promise((resolve, reject) => {
        var file = inputFile.files[0];
        var info = {
            startTime: Math.random() * 5000 | 0,
            duration: 18,//(Math.random() * 300 | 0) + 60,
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
        socket.on('upload-done', data => {
            console.timeEnd('process');
            startExtractTime = Date.now();
            console.log("upload-done");
            uploadDone = true;
        });
        socket.on('done', data => {
            extractDone = true;
            console.log("done", data);
        });
        socket.on('progress', data => {
            progress = data.progress;
            console.log("progress", data, progress);
        });
        socket.on('err', err => {
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
    if (uploadDone) {
        return;
    }
    if (!partSize) {
        partSize = 10000;
    }
    partSize = Math.min(partSize, 1000000);

    streams[id] = true;
    var reader = new FileReader();
    var end = Math.min(start + partSize, file.size);
    if (end - start > 0) {
        console.log("sendStream", start, end - start, id);
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

function calcProgress() {
    var middlePercent = progress;
    var timeElapsed = (Date.now() - startTime) / 100 | 0;
    var prePercent = 0;
    var endPercent = 0;
    if (!middlePercent) {
        for (var i = 0; i < timeElapsed; i++) {
            prePercent += 0.05 * (1 - prePercent);
        }
    }
    else {
        prePercent = 1;
        if (startExtractTime) {
            var extractTimeElapsed = (Date.now() - startExtractTime) / 100 | 0;
            for (var i = 0; i < extractTimeElapsed; i++) {
                endPercent += 0.05 * (1 - endPercent);
            }
        }
    }
    if (extractDone) {
        endPercent = 1;
    }

    var percent = prePercent * preSize + middlePercent * middleSize + endPercent * endSize;
    progressInput.setAttribute('value', percent);
    if (!extractDone) {
        setTimeout(calcProgress, 500);
    }
}


var socket = io.connect('http://localhost:7878');


