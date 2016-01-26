"use strict";

import {db} from "../db";
import {BaseModel} from "./base";
import {Line} from "../interfaces/line";
export class LinesDAO extends BaseModel<Line> {
    table = 'lines';
}
export var linesDAO = new LinesDAO();