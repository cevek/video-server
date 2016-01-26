import {Route} from "./Router";
export var indexRoute = new Route<{id:number}>('/');
export var uploadRoute = new Route<{id:number}>('/upload');
export var postRoute = new Route<{id:number}>('/post/:id');
export var editorRoute = new Route<{id:number}>('/editor/:id');
