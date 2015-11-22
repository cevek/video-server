/// <reference path="typings/node/node.d.ts" />
'use strict';
require('source-map-support').install();

import {uploaderSessions} from './upload';

var promisify = require('promisify');
var co = require('co');
var fs = require('fs');
var koa = require('koa');
var router = require('koa-router')();
var cors = require('koa-cors');
var koaBody = require('koa-body');
var app = koa();
app.experimental = true;
import {db} from './db';


router.get('/', async function () {
    this.body = 'Hello World!';
});

router.get('/getsession', async function () {
    var uploader = uploaderSessions.create();
    console.log(uploader.sid);
    this.body = {usid: uploader.sid};
});

router.get('/getinfo', async function () {
    var uploader = uploaderSessions.getUploaderBySid(this.request.query.usid);
    this.body = await uploader.getInfo(this.request.body);
});
router.post('/uploadpart', async function () {
    console.log(this.request.query);
    console.log(this.request.body);
    debugger;
    var uploader = uploaderSessions.getUploaderBySid(this.request.query.usid);
    var data = fs.readFileSync(this.request.body.files.data.path);
    await uploader.uploadPart(this.request.query, data);
    debugger;
    var body: any;
    if (this.request.query.getmediainfo){
        body = await uploader.getMediaInfo(this.request.query);
    } else {
        body = {status: 'ok'};
    }
    this.body = body;
});
router.get('/extract', async function () {

});
app.use(koaBody({multipart: true, formidable:{uploadDir: __dirname}}));
app.use(cors({credentials: true}));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(1335);

app.on('error', function (err:Error) {
    console.error('App Error');
    console.error(err);
    console.error(err.stack);
});
console.log("serving localhost:1335");

