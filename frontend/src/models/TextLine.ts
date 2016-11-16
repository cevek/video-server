import {Lang} from "./Lang";
export class TextLine {
    lang: Lang;
    start: number;
    dur: number;
    text: string;

    constructor(lang: Lang, start: number, dur: number, text: string) {
        this.lang = lang;
        this.start = start || 0;
        this.dur = dur || 0;
        this.text = text || '';
    }
}