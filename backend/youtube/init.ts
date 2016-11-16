'use strict';
var yt = require("youtube-api");
import {readFileSync} from "fs";
const CREDENTIALS = JSON.parse(readFileSync(__dirname + "/credentials.json").toString());
export var oauth = yt.authenticate({
    type: "oauth",
    client_id: CREDENTIALS.web.client_id,
    client_secret: CREDENTIALS.web.client_secret,
    redirect_url: CREDENTIALS.web.redirect_uris[0]
});

function promisify(obj:any, method:string) {
    obj[method + 'Async'] = function (data:any) {
        return new Promise((resolve, reject) =>
            obj[method].call(this, data, (err:Error, data:any) =>
                err ? reject(err) : resolve(data)))
    };
}

for (let prop in yt) {
    promisify(yt, prop);
    for (let method in yt[prop]) {
        promisify(yt[prop], method);
    }
}
