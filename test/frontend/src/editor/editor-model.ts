import {Lang} from "../../../interfaces/lang";
import {PostModel} from "../models/post";
import {EditorHistory} from "../utils/history";
import {Line} from "../models/line";
import {ITextLine} from "../../../interfaces/text-line";
import {EditorTextModel} from "./editor-text-model";

export class EditorModel {
    postModel:PostModel;
    lines:EditorLine[] = [];
    history = new EditorHistory();
    resizeKoef = 4;
    lineH = 50;
    title = '';
    tags = '';
    speakers: string[] = [];

    textModel:EditorTextModel;

    fromPostModel(postModel:PostModel){
        this.postModel = postModel;
        this.lines = this.postModel.lines.map(line =>
            new EditorLine(
                new EditorTextLine(Lang.EN, line.en.start, line.en.dur, line.en ? line.en.text.split(/\s+/).map(w => new EditorWord(w)) : []),
                new EditorTextLine(Lang.RU, line.ru.start, line.ru.dur, line.ru ? line.ru.text.split(/\s+/).map(w => new EditorWord(w)) : [])
            ))
        this.textModel = new EditorTextModel(this);
        return this;
    }
    
    save() {
        
    }
}

export class EditorLine extends Line {
    constructor(public en:EditorTextLine = null, public ru:EditorTextLine = null) {
        super();
        if (!en) {
            this.en = new EditorTextLine(Lang.EN, null, null, null);
        }
        if (!ru) {
            this.ru = new EditorTextLine(Lang.RU, null, null, null);
        }
    }

    getTextLine(lang:Lang) {
        return lang == Lang.EN ? this.en : this.ru;
    }

    isEmpty() {
        return this.en.isEmpty() && this.ru.isEmpty();
    }

    setTextLine(lang:Lang, textLine:EditorTextLine) {
        if (lang == Lang.EN) {
            this.en = textLine;
        } else {
            this.ru = textLine;
        }
    }
}

export class EditorTextLine implements ITextLine {
    words:EditorWord[];

    getWord(i:number) {
        return this.words[i];
    }

    isEmpty() {
        return this.getWord(0).isEmpty;
    }

    constructor(public lang:Lang, public start:number, public dur:number, words:EditorWord[]) {
        this.setWords(words);
    }

    setWords(words:EditorWord[]) {
        if (!words) {
            words = [];
        }
        words = words.filter(w => w.word.trim() != '');
        if (words.length == 0) {
            words = [new EditorWord(null)];
        }
        this.words = words;
        return this;
    }
}

export class EditorWord {
    isEmpty = false;

    constructor(public word:string, public span:Element = null) {
        if (word == null) {
            this.isEmpty = true;
            this.word = '\u00A0';
        }
    }
}

export class EditorSelection {
    line:EditorLine;
    linePos:number;
    textLine:EditorTextLine;
    lang:Lang;
    word:EditorWord;
    wordPos:number;

    constructor(public lines:EditorLine[]) {}

    set(linePos:number, lang:Lang, wordPos:number) {
        this.setLine(linePos);
        this.setLang(lang);
        this.setWord(wordPos);
    }

    setLine(linePos:number) {
        this.linePos = linePos;
        this.line = this.lines[linePos];
    }

    setLang(lang:Lang) {
        this.lang = lang;
        this.textLine = this.line.getTextLine(lang);
    }

    invertLang() {
        this.setLang(this.lang == Lang.EN ? Lang.RU : Lang.EN);
    }

    setWord(wordPos:number) {
        this.wordPos = wordPos;
        this.word = this.textLine.getWord(wordPos);
    }

}
