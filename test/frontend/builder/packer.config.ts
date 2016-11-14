import {Packer, copy, combineJS, combineCSS} from "webbuilder";
import {ts} from "webbuilder/dist/plugins/ts";
import {sass} from "webbuilder/dist/plugins/sass";
import * as Koa from "koa";
Error.stackTraceLimit = Infinity;

new Packer({dest: 'dist', context: __dirname + '/../src/'}, promise => promise
    .then(ts())
    .then(sass())
    .then(copy('index.html'))
    .then(combineJS('app.js', 'bundle.js'))
    .then(combineCSS('style.css'))
).watch(() => {

});

const serve = require('koa-static');
const app = new Koa();
app.use(serve(__dirname + '/../src/dist/'));
app.listen(3000);
console.log('Listen http://localhost:3000/');