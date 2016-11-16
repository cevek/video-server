import {Packer, copy, combineJS, combineCSS} from "webbuilder";
import {ts} from "webbuilder/dist/plugins/ts";
import {sass} from "webbuilder/dist/plugins/sass";

export default new Packer({dest: 'dist', context: __dirname + '/../src/'}, promise => promise
    .then(ts())
    .then(sass())
    .then(copy('index.html'))
    .then(combineJS('app.js', 'bundle.js'))
    .then(combineCSS('style.css'))
);
