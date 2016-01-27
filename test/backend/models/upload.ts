"use strict";

import {Upload} from "../../interfaces/upload";
import {db} from "../db";
import {BaseModel} from "./base";

export class UploadDAO extends BaseModel<Upload> {
    table = 'uploads';
}
export var uploadsDAO = new UploadDAO();
