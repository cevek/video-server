import {IMySql} from "mysql";
const mysql:IMySql = require('mysql2');

import {config} from './config';
import {DB} from "./db";
import {LinesDAO, MediaFilesDAO, PostsDAO, TextLinesDAO, UploadsDAO, UserTextsDAO} from "./db-models";

var pool = mysql.createPool({
    database: config.db.name,
    user: config.db.user,
    password: config.db.password
});

export const db = new DB(pool);

export const linesDAO = new LinesDAO(db);
export const mediaFilesDAO = new MediaFilesDAO(db);
export const postsDAO = new PostsDAO(db);
export const textLinesDAO = new TextLinesDAO(db);
export const uploadsDAO = new UploadsDAO(db);
export const userTextsDAO = new UserTextsDAO(db);


