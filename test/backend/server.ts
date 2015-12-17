'use strict';
import {postDAO} from "./models/post";
import {db} from './db';
var fs = require('fs');
var koa = require('koa');
var router = require('koa-router')();
var cors = require('koa-cors');
var koaBody = require('koa-body');
var app = koa();

router.get('/', async () => {
    this.body = 'Hello World!';
});

router.post('/v1/post/', async function () {
    await db.transaction(async (trx) => {
        await postDAO.create({
            title: ''
        }, trx);
    });
    this.body = 'Hello World!';
});

app.use(koaBody({multipart: true, formidable: {uploadDir: __dirname}}));
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

