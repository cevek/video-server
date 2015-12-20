"use strict";

import {TextLine} from "../interfaces/text-line";
import {db} from "../db";
import {BaseModel} from "./base";

export class TextLineDAO extends BaseModel<TextLine> {
    table = 'textLines';
}
export var textLineDAO = new TextLineDAO();
