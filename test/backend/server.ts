import {Post} from "./interfaces/post";
'use strict';
import {createPost} from "./services/post";
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
    var postData = <Post>this.params;
    createPost(postData);
    this.body = {success: true};
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
