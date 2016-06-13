import {prop} from "../../atom-next/prop";
import {ITextLines} from "../../../backend/interfaces/db-models";
export class Line {
    @prop en: ITextLines;
    @prop ru: ITextLines;
    @prop speaker: string;
}
