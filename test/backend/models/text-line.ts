"use strict";

import {ITextLine} from "../../interfaces/text-line";
import {db} from "../db";
import {BaseModel} from "./base";

export class TextLineDAO extends BaseModel<ITextLine> {
    table = 'textLines';
}
export var textLineDAO = new TextLineDAO();
