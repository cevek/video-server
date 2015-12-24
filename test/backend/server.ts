'use strict';
import {toMap} from "./utils";
import {config} from "./config";
import {Post} from "./interfaces/post";
import {createPost} from "./services/post";
import {postDAO} from "./models/post";
import {db} from './db';
import {linesDAO} from "./models/line";
import {textLineDAO} from "./models/text-line";
import {mediaFilesDAO} from "./models/media-file";
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
    var post = await postDAO.findById(id);
    if (post) {
        var lines = await linesDAO.findAll({postId: id});
        var textLines = await textLineDAO.findAll({postId: id});
        this.body = {success: true, data: {post, lines: toMap(lines), textLines: toMap(textLines)}};
    }
    else {
        this.body = {success: false, error: 'Not Found'};
    }
});


router.get('/v1/file/:id', async function(){
    var id = this.params.id;
    var mediaFile = await mediaFilesDAO.findById(id);
    var url = mediaFile.url;
    if (!url.match(/^http/)){
        url = '/' + url;
    }
    this.redirect(url);
    //this.body = mediaFile ? {success: true, data: mediaFile.filename} : {success: false, error: 'Not Found'}
});

router.post('/v1/post/', async function () {
    var postData = <Post>this.request.body;
    await createPost(postData);
    this.body = {success: true};
});

app.use(serve(config.dir));
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
