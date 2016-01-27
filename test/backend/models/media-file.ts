"use strict";

import {db} from "../db";
import {MediaFile} from "../../interfaces/media-file";
import {BaseModel} from "./base";

class MediaFilesDAO extends BaseModel<MediaFile> {
    table = 'mediaFiles';
}
export var mediaFilesDAO = new MediaFilesDAO();
