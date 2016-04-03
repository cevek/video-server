import {ITextLine} from "../../../interfaces/text-line";
import {prop} from "../../models";
export class Line {
    @prop en: ITextLine;
    @prop ru: ITextLine;
    @prop speaker: string;
}
