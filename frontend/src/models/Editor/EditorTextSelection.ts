import {prop} from "atom-next";
import {EditorWord} from "./EditorWord";
import {EditorTextLine} from "./EditorTextLine";
import {Lang} from "../Lang";
import {EditorModel} from "./EditorModel";
export class EditorSelection {
    // @prop line: EditorLine;
    @prop linePos: number;
    @prop textLine: EditorTextLine;
    @prop lang: Lang;
    @prop word: EditorWord;
    @prop wordPos: number;
    // @prop lines: EditorLine[];

    constructor(public model: EditorModel) {
        // this.model = modle;
    }

    set(linePos: number, textLine: EditorTextLine, wordPos: number) {
        this.setLine(linePos);
        this.setTextLine(textLine);
        this.setWord(wordPos);
    }

    setLine(linePos: number) {
        this.linePos = linePos;
        // this.line = this.lines[linePos];
    }

    setLang(lang: Lang) {
        this.setTextLine(lang === Lang.EN ? this.model.post.enLines.get(this.linePos) : this.model.post.ruLines.get(this.linePos));
    }

    setTextLine(textLine: EditorTextLine) {
        if (this.textLine) {
            this.textLine.selected = false;
        }
        this.textLine = textLine;
        this.textLine.selected = true;
        this.lang = textLine.lang;
    }

    invertLang() {
        this.setLang(this.lang == Lang.EN ? Lang.RU : Lang.EN);
    }

    setWord(wordPos: number) {
        this.wordPos = wordPos;
        if (this.word) {
            this.word.selected = false;
        }
        this.word = this.textLine.getWord(wordPos);
        this.word.selected = true;
    }

}