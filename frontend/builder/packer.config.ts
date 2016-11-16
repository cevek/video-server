import {Packer, copy, combineJS, combineCSS} from "webbuilder";
import {ts} from "webbuilder/dist/plugins/ts";
import {sass} from "webbuilder/dist/plugins/sass";

const config = {
    dest: 'dist',
    context: __dirname + '/../src/',
    alias: {
        'react': 'fast-react',
        'react-dom': 'fast-react',
    }
};
export default new Packer(config, promise => promise
    .then(ts())
    .then(sass())
    .then(copy('index.html'))
    .then(copy('font-awesome-4.6.1/fonts/*.woff', filename => filename.replace('font-awesome-4.6.1/', '')))
    .then(combineJS('App.js', 'bundle.js'))
    .then(combineCSS('style.css'))
);
