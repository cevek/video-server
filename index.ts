/// <reference path="typings/node/node.d.ts" />
'use strict';
import {uploaderSessions} from './upload';

var promisify = require('promisify');
var co = require('co');
var koa = require('koa');
var router = require('koa-router')();
var cors = require('koa-cors');
var app = koa();
app.experimental = true;
import {db} from './db';


router.get('/', async function () {
    this.body = 'Hello World!';
});

router.get('/getsession', async function () {
    var uploader = uploaderSessions.create();
    this.body = {usid: uploader.sid};
});

router.get('/getinfo', async function () {
    var uploader = uploaderSessions.getUploaderBySid(this.params.sid);
    this.body = await uploader.getInfo(this.body);
});
router.get('/uploadpart', async function () {
    var uploader = uploaderSessions.getUploaderBySid(this.params.sid);
    this.body = await uploader.uploadPart(this.params, this.data);
    if (this.params.getmediainfo){
        this.body = await uploader.getMediaInfo(this.params);
    } else {
        this.body = {status: 'ok'};
    }
});
router.get('/extract', async function () {

});

router.get('/api/addtextlines', async function () {
    var data = this.request;

    var transaction = await db.beginTransaction();
    await transaction.query(db.insertSql('lines', data.lines));
    await transaction.query(db.insertSql('textLines', data.textLines));
    await transaction.commit();

    this.body = {status: "ok"};
});

app.use(cors({credentials: true}));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3700);

app.on('error', function (err:Error) {
    console.error(err.stack);
});
console.log("serving localhost:3700");

