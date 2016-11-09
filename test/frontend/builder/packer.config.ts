import {Packer} from "packer";
import {ts} from "packer/dist/plugins/ts";
import {combineJS} from "packer/dist/plugins/combineJS";
import {dest} from "packer/dist/plugins/dest";
import {jsEntry} from "packer/dist/plugins/jsEntry";
import {copy} from "packer/dist/plugins/copy";
import {sass} from "packer/dist/plugins/sass";
import {combineCSS} from "packer/dist/plugins/combineCSS";
import * as path from "path";
Error.stackTraceLimit = Infinity;

new Packer({dest: 'dist', context: __dirname + '/../src/'}, promise => promise
        .then(ts())
        .then(jsEntry('app.js'))
        // .then(hmr())
        // .then(copy('test/*.js'))
        // .then(jsEntry('test/r.js'))
        .then(copy('index.html'))
        // .then(sass('index.scss'))
        .then(combineJS('bundle.js'))
        .then(sass(''))
        .then(combineCSS('style.css'))
        .then(dest())
    /*
     .then(postcss())
     .then(combineJS('dist/vendor.js', ['react', 'mobx']))
     .then(combineCSS('dist/style.css'))
     .then(hash())
     .then(jade())
     .then(dest())*/
).watch(() => {

});

import * as Koa from 'koa';

// var koa = require('koa');
var serve = require('koa-static');


const app = new Koa();
app.use(serve(__dirname + '/../src/dist/'));
app.listen(3000);

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason: any, p: any) => {
    console.error(reason.stack);
    unhandledRejections.set(p, reason);
});
process.on('rejectionHandled', (p: any) => {
    unhandledRejections.delete(p);
});
