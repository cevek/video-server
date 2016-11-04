import {EditorTextLine} from "./EditorTextLine";
import {Line} from "../Line";
import {Speaker} from "../Speaker";
import {TextLine} from "../TextLine";
import {Lang} from "../Lang";
export class EditorLine extends Line {
    en: EditorTextLine;
    ru: EditorTextLine;

    constructor(en: TextLine, ru: TextLine, speaker: Speaker) {
        super(
            new EditorTextLine(Lang.EN, en.start, en.dur, en.text),
            new EditorTextLine(Lang.RU, ru.start, ru.dur, ru.text),
            speaker
        );
    }


    static createEmpty() {
        return new EditorLine(new TextLine(Lang.EN, null, null, null), new TextLine(Lang.EN, null, null, null), null);
    }

    getTextLine(lang: Lang) {
        return lang == Lang.EN ? this.en : this.ru;
    }

    isEmpty() {
        return this.en.isEmpty() && this.ru.isEmpty();
    }

    setTextLine(lang: Lang, textLine: EditorTextLine) {
        if (lang == Lang.EN) {
            this.en = textLine;
        } else {
            this.ru = textLine;
        }
    }
}