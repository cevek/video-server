import {Post} from "../interfaces/post";
"use strict";

import {db} from "../db";
import {parseSubtitles} from "./subtitle";
import {SubtitleSync} from "./subtitle";
import {genId} from "../utils";
import {textLineDAO} from "../models/text-line";
import {linesDAO} from "../models/line";
import {postDAO} from "../models/post";
import {readFileSync} from "fs";
import {getFileName} from "./file";
import {TextLine} from "../interfaces/text-line";
import {Line} from "../interfaces/line";
import {uploadsDAO} from "../models/upload";
import {mediaFilesDAO} from "../models/media-file";
import {MediaType} from "../interfaces/media-types";

export async function createPost(post:Post) {
    var enFile = await mediaFilesDAO.findById(post.enSub);
    var ruFile = await mediaFilesDAO.findById(post.ruSub);

    //todo: need validate
    var enSub = readFileSync(enFile.filename).toString();
    var ruSub = readFileSync(ruFile.filename).toString();
    var subtitlesShift = JSON.parse(enFile.info).subtitlesShift || 0;
    var subtitleSync = new SubtitleSync(parseSubtitles(enSub, subtitlesShift), parseSubtitles(ruSub, subtitlesShift));
    var mergeLines = subtitleSync.merge();
    await db.transaction(async (trx) => {
        post.id = genId();
        var textLines:TextLine[] = [];
        var lines:Line[] = [];
        for (var i = 0; i < mergeLines.length; i++) {
            var mergeLine = mergeLines[i];
            var line:Line = {id: genId(), postId: post.id, seq: i};
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
        await postDAO.create(post, trx);
        await textLineDAO.createBulk(textLines, trx);
        await linesDAO.createBulk(lines, trx);
    });
    return post;
}