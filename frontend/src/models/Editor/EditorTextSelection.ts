import {EditorLine} from "./EditorLine";
import {prop} from "atom-next";
import {EditorWord} from "./EditorWord";
import {EditorTextLine} from "./EditorTextLine";
import {Lang} from "../Lang";
export class EditorSelection {
    @prop line: EditorLine;
    @prop linePos: number;
    @prop textLine: EditorTextLine;
    @prop lang: Lang;
    @prop word: EditorWord;
    @prop wordPos: number;
    @prop lines: EditorLine[];

    constructor(lines: EditorLine[]) {
        this.lines = lines;
    }

    set(linePos: number, lang: Lang, wordPos: number) {
        this.setLine(linePos);
        this.setLang(lang);
        this.setWord(wordPos);
    }

    setLine(linePos: number) {
        this.linePos = linePos;
        this.line = this.lines[linePos];
    }

    setLang(lang: Lang) {
        this.lang = lang;
        this.textLine = this.line.getTextLine(lang);
    }

    invertLang() {
        this.setLang(this.lang == Lang.EN ? Lang.RU : Lang.EN);
    }

    setWord(wordPos: number) {
        this.wordPos = wordPos;
        this.word = this.textLine.getWord(wordPos);
    }

}