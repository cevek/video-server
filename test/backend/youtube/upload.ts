var yt = require("youtube-api");
import {oauth} from "./init";
import {readFileSync, createReadStream} from 'fs';
var tokens = JSON.parse(readFileSync(__dirname + '/tokens.json').toString());
oauth.setCredentials(tokens);

//todo: need timeout
export function upload(title:string, filename:string) {
    return yt.videos.insertAsync({
        resource: {
            snippet: {
                title: title,
                description: ""
            },
            status: {
                privacyStatus: "public"
            }
        },
        part: "snippet,status",
        media: {
            body: createReadStream(filename)
        }
    }).then((data:{id:string}) => data.id);
}
