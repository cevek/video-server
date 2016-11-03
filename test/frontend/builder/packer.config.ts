import {Packer} from "packer";
import {ts} from "packer/dist/plugins/ts";
import {combineJS} from "packer/dist/plugins/combineJS";
import {dest} from "packer/dist/plugins/dest";
import {jsEntry} from "packer/dist/plugins/jsEntry";
import {copy} from "packer/dist/plugins/copy";
import {conditional} from "packer/dist/utils/conditional";


// const prodOnly = conditional(() => process.env.NODE_ENV == 'production');
const prodOnly = conditional(() => true);
new Packer({dest: 'dist', context: __dirname + '/../'}, promise => promise
        .then(ts())
        .then(jsEntry('src/index.js'))
        // .then(hmr())
        // .then(copy('test/*.js'))
        // .then(jsEntry('test/r.js'))
        .then(prodOnly(copy('index.html')))
        // .then(sass('index.scss'))
        .then(combineJS('bundle.js'))
        // .then(combineCSS('style.css'))
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


const unhandledRejections = new Map();
process.on('unhandledRejection', (reason: any, p: any) => {
    console.error(reason.stack);
    unhandledRejections.set(p, reason);
});
process.on('rejectionHandled', (p: any) => {
    unhandledRejections.delete(p);
});
