"use strict";

import {db} from "../db";
import {BaseModel} from "./base";
import {ILine} from "../../interfaces/line";
export class LinesDAO extends BaseModel<ILine> {
    table = 'lines';
}
export var linesDAO = new LinesDAO();