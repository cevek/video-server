import {ITextLine} from "../../../interfaces/text-line";
import {prop} from "../../atom-next/prop";
export class Line {
    @prop en: ITextLine;
    @prop ru: ITextLine;
    @prop speaker: string;
}
