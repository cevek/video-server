import {prop} from "atom-next";
import {EditorWord} from "./EditorWord";
import {TextLine} from "../TextLine";
import {Lang} from "../Lang";
export class EditorTextLine extends TextLine {
    id: number;
    text: string;

    @prop words: EditorWord[];
    @prop lang: Lang;
    @prop start: number;
    @prop dur: number;
    @prop selected = false;

    getWord(i: number) {
        return this.words[i];
    }

    isEmpty() {
        return this.getWord(0).isEmpty;
    }

    constructor(lang: Lang, start: number, dur: number, text: string) {
        super(lang, start, dur, text);
        this.setText(text);
    }

    static createWithExistsWords(lang: Lang, start: number, dur: number, words: EditorWord[]) {
        const tl = new EditorTextLine(lang, start, dur, '');
        tl.words = words;
        tl.text = words.join(' ');
        return tl;
    }

    setWords(words: EditorWord[]) {
        if (!words) {
            words = [];
        }
        words = words.filter(w => w.word.trim() != '');
        if (words.length == 0) {
            words = [];
            words.push(new EditorWord(null));
        }
        this.words = words;
        return this;
    }

    getText() {
        return this.words.map(w => w.word).join(' ');
    }

    setText(text: string) {
        return this.setWords(text.split(/\s+/).map(w => new EditorWord(w)));
    }
}