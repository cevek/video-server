"use strict";

import {db} from "../db";
import {BaseModel} from "./base";
import {Transaction} from "../db";
import {SubtitleSync} from "../services/subtitle";
import {parseSubtitles} from "../services/subtitle";
import {linesDAO} from "./line";
import {textLineDAO} from "./text-line";
import {genId} from "../utils";
import {Post} from "../../interfaces/post";

class PostDAO extends BaseModel<Post> {
    protected table = 'posts';
}

export var postDAO = new PostDAO();


