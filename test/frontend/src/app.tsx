"use strict";
import "./font-awesome-4.6.1/css/font-awesome.css";
import "./app.css";
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {Index} from "./index/index";
import {Router} from "./Router";
import {uploadRoute, postRoute, editorRoute, indexRoute, post2Route} from "./routes";
// import {Viewer} from "./viewer/viewer";
import {Upload} from "./uploader/uploader";
import {Post2} from "./post2/Post2";

// atomBenchmark();



// ReactDOM.render(<Boom/>, document.querySelector('#main'));

ReactDOM.render(<Router pages={[
    {route: indexRoute, handler: Index},
    {route: uploadRoute, handler: Upload},
    //{route: postRoute, handler: Viewer, resolver: Viewer.load},
    {route: post2Route, handler: Post2, resolver: Post2.load},
//    {route: editorRoute, handler: Editor, resolver: Editor.load},
]}/>, document.querySelector('#main'));





