'use strict';
import {IGetPost} from "./interfaces/transport";
import {toMap, downloadFile, exec, fileExists, genId} from "./utils";
import {config} from "./config";
import {createPost} from "./services/post";
import {linesDAO, mediaFilesDAO, textLinesDAO, postsDAO, speakersDAO} from "./db-init";
import {IPosts} from "./interfaces/db-models";
import * as Koa from "koa";
import * as serve from "koa-static";
import * as KoaRouter from "koa-router";
const cors = require('koa-cors');
const koaBody = require('koa-body');
const app = new Koa();
const router = new KoaRouter();
import request = require('request');
const mkdirp = require('mkdirp');
router.get('/', async() => {
    this.body = 'Hello World!';
});

router.get('/v1/post/:id', async function () {
    const id = this.params.id;
    const post = await postsDAO.findById(id);
    if (post) {
        const lines = await linesDAO.findAll({postId: id});
        //lines.sort((a, b) => a.seq < b.seq ? -1 : 1);
        const speakersIds = lines.map(l => l.speaker).filter(sp => sp);
        const speakers = speakersIds.length ? (await speakersDAO.findAll('WHERE id IN (' + speakersIds.join() + ')')) : [];
        const textLines = await textLinesDAO.findAll({postId: id});
        const mediaFiles = await mediaFilesDAO.findByIds([post.video, post.thumbs, post.enAudio, post.ruAudio, post.enSub, post.ruSub, ...speakers.map(s => s.photo)]);
        const data: IGetPost = {
            post,
            lines: lines,
            textLines: toMap(textLines),
            mediaFiles: toMap(mediaFiles),
            speakers: toMap(speakers)
        };
        this.body = {success: true, data};
    }
    else {
        this.body = {success: false, error: 'Not Found'};
    }
});

router.get('/v1/file/:id', async function () {
    const id = this.params.id;
    const mediaFile = await mediaFilesDAO.findById(id);
    if (mediaFile) {
        let url = mediaFile.url;
        if (!url.match(/^http/)) {
            url = '/' + url;
        }
        this.redirect(url);
    }
    //this.body = mediaFile ? {success: true, data: mediaFile.filename} : {success: false, error: 'Not Found'}
});

router.post('/v1/post/', async function () {
    const postData = <IPosts>this.request.body;
    const post = await createPost(postData);
    this.body = {success: true, data: post.id};
});

router.put('/v1/post/', async function () {
    const postData = <IPosts>this.request.body;
    const post = await createPost(postData);
    this.body = {success: true, data: post.id};
});

router.get('/prepare/:postId', async function () {
    const id = this.params.postId;
    const post = await postsDAO.findById(id);
    if (post) {
        const videoFile = await mediaFilesDAO.findById(post.video);
        if (videoFile) {
            const dirname = config.dir + '/' + id;
            const videoFilename = dirname + '/video.mp4';
            const audioFilename = dirname + '/enAudio.mp4';
            mkdirp.sync(dirname);
            if (!fileExists(videoFilename)) {
                await downloadFile(videoFile.url, videoFilename);
                const mediaId = genId();
                await mediaFilesDAO.create({
                    url: `${id}/video.mp4`,
                    id: mediaId,
                    type: 2,
                    uploadId: null,
                    filename: videoFilename,
                    createdAt: new Date(),
                    info: null,
                    startTime: null,
                    shiftTime: 0,
                    duration: 0,
                    videoFile: null
                });
                await postsDAO.update(id, {
                    enAudio: void 0,
                    createdAt: void 0,
                    ruAudio: void 0,
                    enSub: void 0,
                    ruSub: void 0,
                    id: void 0,
                    thumbs: void 0,
                    title: void 0,
                    video: mediaId
                })
            }
            if (!fileExists(audioFilename)) {
                await exec(`ffmpeg -i ${videoFilename} -vn -sn -c:a libfdk_aac -profile:a aac_he_v2 -ac 2 -b:a 32k ${audioFilename}`);
                const mediaId = genId();
                await mediaFilesDAO.create({
                    url: `${id}/enAudio.mp4`,
                    id: mediaId,
                    type: 2,
                    uploadId: null,
                    filename: audioFilename,
                    createdAt: new Date(),
                    info: null,
                    startTime: null,
                    shiftTime: 0,
                    duration: 0,
                    videoFile: null
                });
                await postsDAO.update(id, {
                    enAudio: mediaId,
                    createdAt: void 0,
                    ruAudio: void 0,
                    enSub: void 0,
                    ruSub: void 0,
                    id: void 0,
                    thumbs: void 0,
                    title: void 0,
                    video: void 0
                })
            }
            this.body = 'Ok';
            console.log(`prepare done ${id}`);
        }
    }
});

app.use(cors({credentials: true}));
app.use(serve(config.dir));
app.use(koaBody({multipart: true, formidable: {uploadDir: __dirname}}));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(1335);

app.on('error', function (err: Error) {
    console.error('App Error');
    console.error(err);
    console.error(err.stack);
});
console.log("serving localhost:1335");
