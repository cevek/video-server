import {Lang} from "../../../backend/interfaces/lang";
import {EditorHistoryData, EditorHistory, EditorHistoryStringData} from "../utils/history";
import {EditorSelection, EditorLine, EditorTextLine, EditorWord, EditorModel} from "./editor-model";
import {prop} from "../../atom-next/prop";

const historySplit = 'split';
const historySplitMove = 'split-move';
const historyJoin = 'join';
const historyJoinMove = 'join-move';

const historySpeaker = 'speaker';
const historyTextLine = 'text-line';

class HistoryText extends EditorHistoryData<HistoryText> {
    linePos:number;
    lang:Lang;
    wordPos:number;
}

class HistoryTextSpeaker extends EditorHistoryData<HistoryTextSpeaker> {
    type = historySpeaker;
    oldValue:string;
    newValue:string;
    linePos:number;
}

class HistoryTextWords extends EditorHistoryData<HistoryTextWords> {
    type = historyTextLine;
    linePos:number;
    lang:Lang;
    oldValue:string;
    newValue:string;
}

export class EditorTextModel {
    @prop editorModel:EditorModel
    @prop lines:EditorLine[];
    @prop selection:EditorSelection;
    @prop history:EditorHistory;

    constructor(editorModel:EditorModel) {
        this.editorModel = editorModel;
        this.lines = editorModel.lines;
        this.selection = new EditorSelection(this.editorModel.lines);
        this.history = this.editorModel.history
            .listen(historySpeaker, this.historySetSpeaker)
            .listen(historyTextLine, this.historySetTextLine)

            .listen(historySplit, this.historySplit)
            .listen(historySplitMove, this.historySplitMove)
            .listen(historyJoin, this.historyJoin)
            .listen(historyJoinMove, this.historyJoinMove)
    }

    historySetTextLine = (data:HistoryTextWords, isRedo:boolean) => {
        this.lines[data.linePos].getTextLine(data.lang).setText(isRedo ? data.newValue : data.oldValue);
    }

    historySetSpeaker = (data:HistoryTextSpeaker, isRedo:boolean) => {
        this.lines[data.linePos].speaker = isRedo ? data.newValue : data.oldValue;
    }

    historyJoin = (data:HistoryText, isRedo:boolean) => {
        this.selection.set(data.linePos, data.lang, data.wordPos);
        this.splitIntoNewLine();
        //todo: redo
    }

    historyJoinMove = (data:HistoryText, isRedo:boolean) => {
        this.selection.set(data.linePos, data.lang, data.wordPos);
        this.splitWithMove();
        //todo: redo
    }

    historySplit = (data:HistoryText, isRedo:boolean) => {
        this.selection.set(data.linePos, data.lang, data.wordPos);
        this.joinLine();
        //todo: redo
    }

    historySplitMove = (data:HistoryText, isRedo:boolean) => {
        this.selection.set(data.linePos, data.lang, data.wordPos);
        this.joinLineWithMove();
        //todo: redo
    }

    findClosestNextWord(currWord:EditorWord, nextTextLine:EditorTextLine) {
        var currRect = currWord.span.getBoundingClientRect();
        var currPos = currRect.left + currRect.width / 2;
        return nextTextLine.words.map((w, i) => {
            var rect = w.span.getBoundingClientRect();
            var pos = rect.left + rect.width / 2;
            return {word: w, pos: i, diff: Math.abs(currPos - pos)};
        }).sort((a, b) => a.diff < b.diff ? -1 : 1).shift().pos;
    }

    splitWithMove() {
        var sel = this.selection;
        const currentTextLine = sel.textLine;
        const halfDur = currentTextLine.dur / 2;
        var origWords = currentTextLine.words.slice();
        const oldDur = currentTextLine.dur;

        var lastLine = this.lines[this.lines.length - 1];
        if (!lastLine.getTextLine(sel.lang).isEmpty()) {
            this.lines.push(new EditorLine());
        }
        for (var i = this.lines.length - 1; i > sel.linePos; i--) {
            this.lines[i].setTextLine(sel.lang, this.lines[i - 1].getTextLine(sel.lang));
        }
        sel.line.setTextLine(sel.lang, new EditorTextLine(sel.lang, currentTextLine.start, halfDur, origWords.slice(0, sel.wordPos)));

        const prevTextLine = sel.textLine;
        //currentTextLine.start += currentTextLine.dur;

        var nextLinePos = sel.linePos + 1;
        var newLine = this.lines[nextLinePos];
        var selTextLine = newLine.getTextLine(sel.lang);
        selTextLine.setWords(origWords.slice(sel.wordPos));
        selTextLine.start = currentTextLine.start + halfDur;
        selTextLine.dur = halfDur;

        this.selection.set(nextLinePos, sel.lang, 0);


        /* return new EditorHistoryTimeline({
         type: EditorHistoryTimeline.type,
         lineN: nextLinePos - 1,
         lang: sel.lang,
         oldStart: prevTextLine.start,
         oldDur: oldDur,
         newStart: prevTextLine.start,
         newDur: prevTextLine.dur
         });*/

        /*new EditorHistoryTimeline({
         type: EditorHistoryTimeline.type,
         lineN: nextLinePos,
         lang: sel.lang,
         oldStart: 0,
         oldDur: 0,
         newStart: selTextLine.start,
         newDur: selTextLine.dur
         });*/

        return new HistoryText({
            type: historySplitMove,
            lang: sel.lang,
            linePos: nextLinePos,
            wordPos: 0
        });
    }

    splitIntoNewLine() {
        var sel = this.selection;
        var origWords = sel.textLine.words.slice();
        const currentTextLine = sel.textLine;

        currentTextLine.setWords(origWords.slice(0, sel.wordPos));
        var nextLinePos = sel.linePos + 1;
        var nextLine = this.lines[nextLinePos];
        if (!nextLine.getTextLine(sel.lang).isEmpty()) {
            nextLine = new EditorLine();
            this.lines.splice(nextLinePos, 0, nextLine);
        }
        const nextTextLine = nextLine.getTextLine(sel.lang);
        nextTextLine.setWords(origWords.slice(sel.wordPos));
        nextTextLine.start = currentTextLine.start + currentTextLine.dur / 2;
        currentTextLine.dur /= 2;
        nextTextLine.dur = currentTextLine.dur;
        this.selection.set(nextLinePos, sel.lang, 0);
        return new HistoryText({
            type: historySplit,
            lang: sel.lang,
            linePos: nextLinePos,
            wordPos: 0
        });
    }

    _joinLine() {
        var sel = this.selection;
        const currentTextLine = sel.textLine;
        var origWords = currentTextLine.words.slice();
        var prevLinePos = sel.linePos - 1;
        var prevLine = this.lines[prevLinePos];
        var prevTextLine = prevLine.getTextLine(sel.lang);
        var prevWords = prevTextLine.words;
        var newWords = [...prevWords, ...origWords];
        var textLine = new EditorTextLine(sel.lang, prevTextLine.start, currentTextLine.start - prevTextLine.start + currentTextLine.dur, newWords);
        prevLine.setTextLine(sel.lang, textLine);
        sel.textLine.setWords(null);
        var newWordPos = prevWords.length - (prevWords[0].isEmpty ? 1 : 0);
        this.selection.set(prevLinePos, sel.lang, newWordPos);
        return new HistoryText({
            type: historyJoin,
            lang: sel.lang,
            linePos: prevLinePos,
            wordPos: newWordPos
        });
    }

    joinLine(){
        const undo = this._joinLine();
        const sel = this.selection;
        if (sel.line.isEmpty()) {
            this.lines.splice(sel.linePos, 1);
        }
        return undo;
    }

    joinLineWithMove() {
        var lang = this.selection.lang;
        var linePos = this.selection.linePos;

        var undo = this._joinLine();
        if (undo) {
            for (var i = linePos + 1; i < this.lines.length; i++) {
                this.lines[i - 1].setTextLine(lang, this.lines[i].getTextLine(lang));
            }
            var lastLine = this.lines[this.lines.length - 1];
            lastLine.setTextLine(lang, new EditorTextLine(lang, null, null, null));
            if (lastLine.isEmpty()) {
                this.lines.pop();
            }
            undo.type = historyJoinMove;
            return undo;
        }
    }

    up() {
        if (this.selection.lang == Lang.EN) {
            if (this.selection.linePos <= 0) {
                return false;
            }
            this.selection.setLine(this.selection.linePos - 1);
        }
        this.selection.invertLang();
        this.selection.setWord(this.findClosestNextWord(this.selection.word, this.selection.textLine));
        return true;
    }

    down() {
        if (this.selection.lang == Lang.RU) {
            if (this.selection.linePos >= this.lines.length - 1) {
                return false;
            }
            this.selection.setLine(this.selection.linePos + 1);
        }
        this.selection.invertLang();
        this.selection.setWord(this.findClosestNextWord(this.selection.word, this.selection.textLine));
        return true;
    }


    left() {
        if (this.selection.wordPos <= 0) {
            return false;
        }
        this.selection.setWord(this.selection.wordPos - 1);
        return true;
    }

    right() {
        if (this.selection.wordPos >= this.selection.textLine.words.length - 1) {
            return false;
        }
        this.selection.setWord(this.selection.wordPos + 1);
        return true;
    }

    setSpeaker(pos:number, speaker:string) {
        this.history.add(new HistoryTextSpeaker({
            type: null,
            linePos: pos,
            oldValue: this.lines[pos].speaker,
            newValue: speaker,
        }));
        this.lines[pos].speaker = speaker;
    }

    setWords(pos:number, lang:Lang, text:string) {
        const textLine = this.lines[pos].getTextLine(lang);
        this.history.add(new HistoryTextWords({
            type: null,
            linePos: pos,
            lang: lang,
            oldValue: textLine.getText(),
            newValue: text,
        }));
        textLine.setText(text);
    }
}
