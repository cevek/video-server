import {writeFileSync} from "fs";
import {oauth} from "./init";

const code = process.argv[2];
oauth.getTokenAsync(code).then((tokens:{}) => {
    writeFileSync(__dirname + '/tokens.json', JSON.stringify(tokens));
}, console.error);
