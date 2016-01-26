"use strict";
import "./app.css";
import {Index} from "./index/index";
import {Editor} from "./editor/editor";
import * as React from 'react';
import {Router} from "./Router";
import {uploadRoute, postRoute, editorRoute, indexRoute} from "./routes";
import {Viewer} from "./viewer/viewer";
import {Upload} from "./uploader/uploader";

React.render(<Router pages={[
    {route: indexRoute, handler: Index},
    {route: uploadRoute, handler: Upload},
    {route: postRoute, handler: Viewer, resolver: Viewer.load},
    {route: editorRoute, handler: Editor, resolver: Editor.load},
]}/>, document.body);



