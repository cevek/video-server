"use strict";
import {parseSubtitles, SubtitleSync} from "./subtitle";
import {genId} from "../utils";
import {readFileSync} from "fs";
import {MediaType} from "../interfaces/media-types";
import {mediaFilesDAO, db, linesDAO, postsDAO, textLinesDAO} from "../db-init";
import {IPosts, ILines, ITextLines} from "../interfaces/db-models";

export async function createPost(post:IPosts) {
    //todo: need validate
    var enSub = '', ruSub = '';

    if (post.enSub && post.ruSub) {
        var enFile = await mediaFilesDAO.findById(post.enSub);
        var ruFile = await mediaFilesDAO.findById(post.ruSub);
        var enSub = readFileSync(enFile.filename).toString();
        var ruSub = readFileSync(ruFile.filename).toString();
    }
    var subtitleSync = new SubtitleSync(parseSubtitles(enSub), parseSubtitles(ruSub));
    var mergeLines = subtitleSync.merge();
    await db.transaction(async (trx) => {
        post.id = genId();
        var textLines:ITextLines[] = [];
        var lines:ILines[] = [];
        for (var i = 0; i < mergeLines.length; i++) {
            var mergeLine = mergeLines[i];
            var line:ILines = {id: genId(), en: null, ru: null, speaker: null, postId: post.id, seq: i};
            for (var j = 0; j < mergeLine.length; j++) {
                var ln = mergeLine[j];
                //todo: why may null
                if (ln) {
                    var textLine = {
                        id: genId(),
                        lineId: line.id,
                        postId: post.id,
                        lang: i,
                        start: ln.start,
                        dur: ln.duration,
                        text: ln.text
                    };
                    if (j == 0) {
                        line.en = textLine.id;
                    }
                    else {
                        line.ru = textLine.id;
                    }
                    textLines.push(textLine);
                }
            }
            lines.push(line);
        }
        if (post.video) {
            var thumbs = await mediaFilesDAO.findOne({videoFile: post.video, type: MediaType.THUMBS});
            post.thumbs = thumbs.id;
        }
        await postsDAO.create(post, trx);
        await textLinesDAO.createBulk(textLines, trx);
        await linesDAO.createBulk(lines, trx);
    });
    return post;
}


export async function updatePost(post:IPosts) {
    return post;
}