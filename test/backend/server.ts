import {IGetPost} from "./interfaces/transport";
'use strict';
import {toMap} from "./utils";
import {config} from "./config";
import {createPost} from "./services/post";
import {linesDAO, mediaFilesDAO, textLinesDAO, postsDAO} from "./db-init";
import {IPosts} from "./interfaces/db-models";
var fs = require('fs');
var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-router')();
var cors = require('koa-cors');
var koaBody = require('koa-body');
var app = koa();

router.get('/', async () => {
    this.body = 'Hello World!';
});

router.get('/v1/post/:id', async function () {
    var id = this.params.id;
    var post = await postsDAO.findById(id);
    if (post) {
        var lines = await linesDAO.findAll({postId: id});
        lines.sort((a, b) => a.seq < b.seq ? -1 : 1);
        var textLines = await textLinesDAO.findAll({postId: id});
        var mediaFiles = await mediaFilesDAO.findByIds([post.video, post.thumbs, post.enAudio, post.ruAudio, post.enSub, post.ruSub]);
        var data:IGetPost = {post, lines: lines, textLines: toMap(textLines), mediaFiles: toMap(mediaFiles)};
        this.body = {success: true, data};
    }
    else {
        this.body = {success: false, error: 'Not Found'};
    }
});

router.get('/v1/file/:id', async function () {
    var id = this.params.id;
    var mediaFile = await mediaFilesDAO.findById(id);
    if (mediaFile) {
        var url = mediaFile.url;
        if (!url.match(/^http/)) {
            url = '/' + url;
        }
        this.redirect(url);
    }
    //this.body = mediaFile ? {success: true, data: mediaFile.filename} : {success: false, error: 'Not Found'}
});

router.post('/v1/post/', async function () {
    var postData = <IPosts>this.request.body;
    var post = await createPost(postData);
    this.body = {success: true, data: post.id};
});

router.put('/v1/post/', async function () {
    var postData = <IPosts>this.request.body;
    var post = await createPost(postData);
    this.body = {success: true, data: post.id};
});

app.use(cors({credentials: true}));
app.use(serve(config.dir));
app.use(koaBody({multipart: true, formidable: {uploadDir: __dirname}}));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(1335);

app.on('error', function (err:Error) {
    console.error('App Error');
    console.error(err);
    console.error(err.stack);
});
console.log("serving localhost:1335");
