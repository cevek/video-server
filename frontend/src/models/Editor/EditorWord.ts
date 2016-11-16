import {prop} from "atom-next";
export class EditorWord {
    @prop isEmpty = false;
    @prop word: string;
    @prop span: Element
    @prop selected = false;

    constructor(word: string, span: Element = null) {
        this.word = word;
        this.span = span;
        if (word == null) {
            this.isEmpty = true;
            this.word = '\u00A0';
        }
    }
}