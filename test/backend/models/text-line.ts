import {db} from "../db";
import {BaseModel} from "./base";
export interface TextLine {
    id: string;
    lang: number;
    start: number;
    dur: number;
    text: string;
    postId: string;
    lineId: string;
}
export class TextLineDAO extends BaseModel<TextLine> {
    table = 'textLines';
}
export var textLineDAO = new TextLineDAO();
