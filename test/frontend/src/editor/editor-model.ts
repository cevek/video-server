import {Lang} from "../../../interfaces/lang";
import {PostModel} from "../models/post";
import {EditorHistory, EditorHistoryData, EditorHistoryStringData} from "../utils/history";
import {Line} from "../models/line";
import {ITextLine} from "../../../interfaces/text-line";
import {EditorTextModel} from "./editor-text-model";
import {prop} from "../../models";
import {EditorSpeakerList} from "./editor-speakerlist-model";

const EDITOR_HISTORY_TITLE = 'title';
const EDITOR_HISTORY_TAGS = 'tags';
export class EditorModel {
    @prop postModel:PostModel;
    @prop lines:EditorLine[] = [];
    @prop history = new EditorHistory()
        .listen(EDITOR_HISTORY_TITLE, (data:EditorHistoryStringData, isRedo:boolean) => {
            console.log(EDITOR_HISTORY_TITLE, data, isRedo);

            this.title = isRedo ? data.newValue : data.oldValue
})
        .listen(EDITOR_HISTORY_TAGS, (data:EditorHistoryStringData, isRedo:boolean) =>
            this.tags = isRedo ? data.newValue : data.oldValue)

    @prop resizeKoef = 4;
    @prop lineH = 50;
    @prop title = '';
    @prop tags = '';
    @prop speakers:EditorSpeakerList;
    @prop textModel:EditorTextModel;

    setTitle(title: string) {
        this.history.add(new EditorHistoryStringData({
            type: EDITOR_HISTORY_TITLE,
            newValue: title,
            oldValue: this.title,
        }));
        this.title = title;
    }

    setTags(tags: string) {
        this.history.add(new EditorHistoryStringData({
            type: EDITOR_HISTORY_TAGS,
            newValue: tags,
            oldValue: this.tags,
        }));
        this.tags = tags;
    }

    fromPostModel(postModel:PostModel) {
        this.postModel = postModel;
        this.lines = this.postModel.lines.map(line =>
            new EditorLine(
                new EditorTextLine(Lang.EN, line.en.start, line.en.dur, line.en ? line.en.text.split(/\s+/).map(w => new EditorWord(w)) : []),
                new EditorTextLine(Lang.RU, line.ru.start, line.ru.dur, line.ru ? line.ru.text.split(/\s+/).map(w => new EditorWord(w)) : [])
            ))
        this.textModel = new EditorTextModel(this);
        this.speakers = new EditorSpeakerList(this);
        return this;
    }

    save() {

    }
}

export class EditorLine extends Line {
    @prop en:EditorTextLine = null;
    @prop ru:EditorTextLine = null

    constructor(en:EditorTextLine = null, ru:EditorTextLine = null) {
        super();
        this.en = en ? en : new EditorTextLine(Lang.EN, null, null, null);
        this.ru = ru ? ru : new EditorTextLine(Lang.RU, null, null, null);
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
    @prop words:EditorWord[];
    @prop lang:Lang;
    @prop start:number;
    @prop dur:number;

    getWord(i:number) {
        return this.words[i];
    }

    isEmpty() {
        return this.getWord(0).isEmpty;
    }

    constructor(lang:Lang, start:number, dur:number, words:EditorWord[]) {
        this.lang = lang;
        this.start = start;
        this.dur = dur;
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
    @prop isEmpty = false;
    @prop word:string;
    @prop span:Element

    constructor(word:string, span:Element = null) {
        this.word = word;
        this.span = span;
        if (word == null) {
            this.isEmpty = true;
            this.word = '\u00A0';
        }
    }
}

export class EditorSelection {
    @prop line:EditorLine;
    @prop linePos:number;
    @prop textLine:EditorTextLine;
    @prop lang:Lang;
    @prop word:EditorWord;
    @prop wordPos:number;
    @prop lines:EditorLine[];

    constructor(lines:EditorLine[]) {
        this.lines = lines;
    }

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
