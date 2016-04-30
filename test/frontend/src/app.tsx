"use strict";
import "./font-awesome-4.6.1/css/font-awesome.css";
import "./app.css";
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {Index} from "./index/index";
import {Editor} from "./editor/editor";
import {Router} from "./Router";
import {uploadRoute, postRoute, editorRoute, indexRoute} from "./routes";
import {Viewer} from "./viewer/viewer";
import {Upload} from "./uploader/uploader";
import {Atom} from "../atom-next/index";

Atom;

ReactDOM.render(<Router pages={[
    {route: indexRoute, handler: Index},
    {route: uploadRoute, handler: Upload},
    {route: postRoute, handler: Viewer, resolver: Viewer.load},
    {route: editorRoute, handler: Editor, resolver: Editor.load},
]}/>, document.querySelector('#main'));



