import {prop} from "atom-next";
import {TextLine} from "./TextLine";
import {Speaker} from "./Speaker";
import {Lang} from "./Lang";
export class Line {
    @prop en: TextLine;
    @prop ru: TextLine;
    @prop speaker: Speaker;

    constructor(en: TextLine, ru: TextLine, speaker: Speaker) {
        this.en = en;
        this.ru = ru;
        this.speaker = speaker;
    }

    getTextLine(lang: Lang): TextLine {
        switch (lang) {
            case Lang.EN:
                return this.en;
            case Lang.RU:
                return this.ru;
        }
    }
}
