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
import {ContentType} from "../media-info";

export async function createPost(post:Post) {
    var enSub = readFileSync(await getFileName(post.enSub)).toString();
    var ruSub = readFileSync(await getFileName(post.ruSub)).toString();
    var ss = parseSubtitles(enSub);
    var subtitleSync = new SubtitleSync(parseSubtitles(enSub), parseSubtitles(ruSub));
    var mergeLines = subtitleSync.merge();
    return await db.transaction(async (trx) => {
        post.id = genId();
        var textLines:TextLine[] = [];
        var lines:Line[] = [];
        for (var i = 0; i < mergeLines.length; i++) {
            var mergeLine = mergeLines[i];
            var line = {id: genId(), postId: post.id};
            for (var j = 0; j < mergeLine.length; j++) {
                var ln = mergeLine[j];
                //todo: why may null
                if (ln) {
                    textLines.push({
                        id: genId(),
                        lineId: line.id,
                        postId: post.id,
                        lang: i,
                        start: ln.start,
                        dur: ln.duration,
                        text: ln.text
                    });
                }
            }
            lines.push(line);
        }
        if (post.video) {
            var thumbs = await mediaFilesDAO.findOne({videoFile: post.video, type: ContentType.THUMBS});
            post.thumbs = thumbs.id;
        }
        await postDAO.create(post, trx);
        await textLineDAO.createBulk(textLines, trx);
        await linesDAO.createBulk(lines, trx);
    });
}