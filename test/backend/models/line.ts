import {db} from "../db";
import {BaseModel} from "./base";
export interface Line {}
export class LinesDAO extends BaseModel<Line> {
    table = 'lines';
}
export var linesDAO = new LinesDAO();