import {Lang} from "../../../interfaces/lang";
import {PostModel} from "../models/post";
import {EditorHistory} from "../utils/history";
import {Line} from "../models/line";
import {ITextLine} from "../../../interfaces/text-line";
export class EditorLine extends Line{
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

export class EditorTextLine implements ITextLine{
    words:Word[];

    getWord(i:number) {
        return this.words[i];
    }

    isEmpty() {
        return this.getWord(0).isEmpty;
    }

    constructor(public lang:Lang, public start:number, public dur:number, words:Word[]) {
        this.setWords(words);
    }

    setWords(words:Word[]) {
        if (!words) {
            words = [];
        }
        words = words.filter(w => w.word.trim() != '');
        if (words.length == 0) {
            words = [new Word(null)];
        }
        this.words = words;
        return this;
    }
}

export class Word {
    isEmpty = false;

    constructor(public word:string, public span:Element = null) {
        if (word == null) {
            this.isEmpty = true;
            this.word = '\u00A0';
        }
    }
}

function parse(s:string) {
    return s.split(/\n/).filter(line => line.trim() != '');
}

const enum EditorAction{
    SPLIT      = 1,
    SPLIT_MOVE = 2,
    JOIN       = 3,
    JOIN_MOVE  = 4
}

class EditorHistoryOld {
    action:EditorAction;
    linePos:number;
    lang:Lang;
    wordPos:number;
}

export class Selection {
    line:EditorLine;
    linePos:number;
    textLine:EditorTextLine;
    lang:Lang;
    word:Word;
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

export class EditorModel {
    lines:EditorLine[] = [];
    selection:Selection;
    history = new EditorHistory();
    resizeKoef = 4;
    lineH = 50;

    constructor(public postModel: PostModel) {
        this.lines = postModel.lines.map(line =>
            new EditorLine(
                new EditorTextLine(Lang.EN, line.en.start, line.en.dur, line.en ? line.en.text.split(/\s+/).map(w => new Word(w)) : []),
                new EditorTextLine(Lang.RU, line.ru.start, line.ru.dur, line.ru ? line.ru.text.split(/\s+/).map(w => new Word(w)) : [])
            ))
        this.selection = new Selection(this.lines)
    }


    findClosestNextWord(currWord:Word, nextTextLine:EditorTextLine) {
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

        var lastLine = this.lines[this.lines.length - 1];
        if (!lastLine.getTextLine(sel.lang).isEmpty()) {
            this.lines.push(new EditorLine());
        }
        for (var i = this.lines.length - 1; i > sel.linePos; i--) {
            this.lines[i].setTextLine(sel.lang, this.lines[i - 1].getTextLine(sel.lang));
        }
        sel.line.setTextLine(sel.lang, new EditorTextLine(sel.lang, currentTextLine.start, halfDur, origWords.slice(0, sel.wordPos)));
        //currentTextLine.start += currentTextLine.dur;

        var nextLinePos = sel.linePos + 1;
        var newLine = this.lines[nextLinePos];
        var selTextLine = newLine.getTextLine(sel.lang);
        selTextLine.setWords(origWords.slice(sel.wordPos));
        selTextLine.start = currentTextLine.start + halfDur;
        selTextLine.dur = halfDur;

        this.selection.set(nextLinePos, sel.lang, 0);
        return {action: EditorAction.SPLIT_MOVE, lang: sel.lang, linePos: nextLinePos, wordPos: 0};
    }

    undoSplitWithMove(undoItem:EditorHistoryOld) {
        this.undoToModify(undoItem);
        this.joinLineWithMove();
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
        return {action: EditorAction.SPLIT, lang: sel.lang, linePos: nextLinePos, wordPos: 0};
    }

    undoSplitIntoNewLine(undoItem:EditorHistoryOld) {
        this.undoToModify(undoItem);
        this.joinLine();
    }

    joinLine() {
        var sel = this.selection;
        const currentTextLine = sel.textLine;
        var origWords = currentTextLine.words.slice();

        if (sel.linePos < 1) {
            return null;
        }
        var prevLinePos = sel.linePos - 1;
        var prevLine = this.lines[prevLinePos];
        var prevTextLine = prevLine.getTextLine(sel.lang);
        var prevWords = prevTextLine.words;
        var newWords = [...prevWords, ...origWords];
        var textLine = new EditorTextLine(sel.lang, prevTextLine.start, currentTextLine.start - prevTextLine.start + currentTextLine.dur, newWords);
        prevLine.setTextLine(sel.lang, textLine);
        sel.textLine.setWords(null);
        if (sel.line.isEmpty()) {
            this.lines.splice(sel.linePos, 1);
        }
        var newWordPos = prevWords.length - (prevWords[0].isEmpty ? 1 : 0);
        this.selection.set(prevLinePos, sel.lang, newWordPos);
        return {action: EditorAction.JOIN, lang: sel.lang, linePos: prevLinePos, wordPos: newWordPos};
    }

    undoJoinLine(undoItem:EditorHistoryOld) {
        this.undoToModify(undoItem);
        this.splitIntoNewLine();
    }

    undoToModify(undoItem:EditorHistoryOld) {
        this.selection.set(undoItem.linePos, undoItem.lang, undoItem.wordPos);
    }

    joinLineWithMove() {
        var lang = this.selection.lang;
        var linePos = this.selection.linePos;

        var undo = this.joinLine();
        if (undo) {
            for (var i = linePos + 1; i < this.lines.length; i++) {
                this.lines[i - 1].setTextLine(lang, this.lines[i].getTextLine(lang));
            }
            var lastLine = this.lines[this.lines.length - 1];
            lastLine.setTextLine(lang, new EditorTextLine(lang, null, null, null));
            if (lastLine.isEmpty()) {
                this.lines.pop();
            }
            undo.action = EditorAction.JOIN_MOVE;
            return undo;
        }
    }

    undoJoinLineWithMove(undoItem:EditorHistoryOld) {
        this.undoToModify(undoItem);
        this.splitWithMove();
    }

    addUndo(undo:EditorHistoryOld) {
        if (undo) {
            console.log("Action", undo);
            this.undoStack.push(undo);
        }
    }

    undoStack:EditorHistoryOld[] = [];

    undo() {
        var undoItem = this.undoStack.pop();
        if (undoItem) {
            console.log("Undo", undoItem);
            switch (undoItem.action) {
                case EditorAction.JOIN:
                    this.undoJoinLine(undoItem);
                    break;
                case EditorAction.JOIN_MOVE:
                    this.undoJoinLineWithMove(undoItem);
                    break;
                case EditorAction.SPLIT:
                    this.undoSplitIntoNewLine(undoItem);
                    break;
                case EditorAction.SPLIT_MOVE:
                    this.undoSplitWithMove(undoItem);
                    break;
            }
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
    };

    right() {
        if (this.selection.wordPos >= this.selection.textLine.words.length - 1) {
            return false;
        }
        this.selection.setWord(this.selection.wordPos + 1);
        return true;
    };

}
