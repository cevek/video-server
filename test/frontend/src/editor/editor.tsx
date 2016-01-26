import './editor.css';
import * as React from 'react';
import * as classNames from 'classnames';
import {PostModel} from "./../post";

var en = `
Oh, it's just me, myself and I
Solo ride until I die,
‘Cause I got me for life,
Got me for life, yeah!
Oh, I don't need a hand to hold
Even when the night is cold,
I got that fire in my soul.

[Verse 1: G-Eazy]
And as far as I can see, I just need privacy
Plus, a whole lot of tree, fuck all this modesty!
I just need space to do me get a world that they're tryna see,
A Stella Maxwell right beside of me,
A Ferrari, I'm buyin' three,
A closet of Saint Laurent, get what I want when I want
‘Cause this hunger is drivin' me, yeah!
I just need to be alone, I just need to be at home,
Understand what I'm speakin' on, if time is money, I need a loan,
But regardless, I'll always keep keepin' on.
Fuck fake friends, we don't take L's,
We just make M's,
While y'all follow, we just make trends,
I'm right back to work when that break ends.

[Refrain: Bebe Rexha]
Oh, it's just me, myself and I
Solo ride until I die,
‘Cause I got me for life,
Got me for life, yeah!
Oh, I don't need a hand to hold
Even when the night is cold,
I got that fire in my soul.

[Chorus: Bebe Rexha]
I don't need anything to get me through the night
Except the beat that's in my heart,
Yeah, it's keeping me alive,
Keeps me alive.
I don't need anything to make me satisfied, you know,
‘Cause the music fills me good and it gets me every time.

[Verse 2: G-Eazy]
Yeah, and I don't like talkin' to strangers,
So get the fuck off me, I'm anxious!
I'm tryna be cool but I may just go ape shit,
Say "fuck y'all" to all of y'all faces,
It changes, though, now that I'm famous,
Everyone knows how this lifestyle is dangerous,
But I love it, the rush is amazing.
Celebrate nightly and everyone rages,
I found how to cope with my anger,
I'm swimmin' in money,
Swimmin' in liquor, my liver is muddy,
But it's all good, I'm still sippin' this bubbly.
This shit is lovely, this shit ain't random, I didn't get lucky,
Made it right here ‘cause I'm sick with it, Cudi.
They all take the money for granted,
But don't want to work for it, tell me now, isn't it funny? Nah.

[Refrain: Bebe Rexha]
Oh, it's just me, myself and I
Solo ride until I die,
‘Cause I got me for life,
Got me for life, yeah!
Oh, I don't need a hand to hold
Even when the night is cold,
I got that fire in my soul.

[Chorus: Bebe Rexha]
I don't need anything to get me through the night
Except the beat that's in my heart,
Yeah, it's keeping me alive,
Keeps me alive.
I don't need anything to make me satisfied, you know,
‘Cause the music fills me good and it gets me every time.

[Bridge: G-Eazy]
Yeah, lonely nights I laid awake,
Pray to lord my soul to take,
My heart's become too cold to break,
Know I'm great but I'm broke as hell.
Havin' dreams that I'm foldin' cake,
All my life I've been told to wait,
But Imma get it now, yeah, it's no debate,
Yeah!

[Refrain: Bebe Rexha]
Oh, it's just me, myself and I
Solo ride until I die,
‘Cause I got me for life,
Got me for life, yeah!
Oh, I don't need a hand to hold
Even when the night is cold,
I got that fire in my soul.

[Chorus: Bebe Rexha]
I don't need anything to get me through the night
Except the beat that's in my heart,
Yeah, it's keeping me alive,
Keeps me alive.
I don't need anything to make me satisfied, you know,
‘Cause the music fills me good and it gets me every time.
`;

var ru = `
О, тут только я, я сама и моя персона,
Еду одна до самой смерти,
Потому что я буду рядом со мной всю жизнь,
Рядом со мной всю жизнь, да!
О, мне не нужна рука помощи
Даже холодной ночью,
Ведь в моей душе огонь!

[Куплет 1: G-Eazy]
Насколько я вижу, мне просто нужно уединение
И много-много травы, в ж**у скромность!
Мне нужно место, чтобы завоевать весь мир, они же хотят видеть
Стеллу Максвелл рядом со мной, 1
"Феррари", дайте три,
Шкаф забит "Сен-Лораном", получаю, что хочу, когда хочу,
Потому что этот голод и движет мной, да!
Мне просто нужно побыть одному, мне просто нужно оказаться дома,
Поймите мои слова, время — деньги, мне нужен кредит,
Но несмотря ни на что я всегда буду продолжать продолжать.
В ж**у притворных друзей, мы не терпим неудач,
Мы просто зашибаем миллионы,
Пока вы следуете им, мы устанавливаем модные веяния,
Я вернусь к работе, когда закончится музыка.

[Рефрен: Bebe Rexha]
О, тут только я, я сама и моя персона,
Еду одна до самой смерти,
Потому что я буду рядом со мной всю жизнь,
Рядом со мной всю жизнь, да!
О, мне не нужна рука помощи
Даже холодной ночью,
Ведь в моей душе огонь!

[Припев: Bebe Rexha]
Мне не нужен другой проводник в ночи
Кроме ритма в моём сердце,
Да, он хранит во мне жизнь,
Хранит во мне жизнь.
Мне не нужно ничего для удовольствия, понимаете,
Потому что музыка питает меня и всегда трогает.

[Куплет 2: G-Eazy]
Да, мне не нравится разговаривать с незнакомцами,
Так что отъ**итесь от меня, я разволновался!
Я пытаюсь хранить спокойствие, но могу и слететь с катушек,
Говорю "пошли вы!" всем вам в лицо,
Всё изменилось, раз я прославился,
Все знают, что такая жизнь до добра не доводит,
Но я люблю её, потрясающее ощущение.
Каждую ночь — праздник, все отрываются,
Я узнал, как справляться со своей злобой,
Я купаюсь в деньгах,
Купаюсь в выпивке, моя печень забита грязью,
Но ничего страшного, я продолжаю пить шипучку.
Это мило, это не случайно, мне не просто повезло,
Я дошёл до этого, потому что ловко управляюсь, Кади. 2
Все принимают деньги как должное,
Но не хотят трудиться ради них, скажите, разве это не смешно? Не-а.

[Рефрен: Bebe Rexha]
О, тут только я, я сама и моя персона,
Еду одна до самой смерти,
Потому что я буду рядом со мной всю жизнь,
Рядом со мной всю жизнь, да!
О, мне не нужна рука помощи
Даже холодной ночью,
Ведь в моей душе огонь!

[Припев: Bebe Rexha]
Мне не нужен другой проводник в ночи
Кроме ритма в моём сердце,
Да, он хранит во мне жизнь,
Хранит во мне жизнь.
Мне не нужно ничего для удовольствия, понимаете,
Потому что музыка питает меня и всегда трогает.

[Связка: G-Eazy]
Да, одинокими ночами я лежу без сна,
Молюсь Господу, чтобы он забрал мою душу,
Моё сердце слишком остыло, чтобы его разбили,
Знаю, что я велик, но беднее церковной мыши.
Мне снится, что я складываю бабло,
Всю жизнь мне велели ждать,
Но теперь-то я его гребу, ага, никаких обсуждений,
Да!

[Рефрен: Bebe Rexha]
О, тут только я, я сама и моя персона,
Еду одна до самой смерти,
Потому что я буду рядом со мной всю жизнь,
Рядом со мной всю жизнь, да!
О, мне не нужна рука помощи
Даже холодной ночью,
Ведь в моей душе огонь!

[Припев: Bebe Rexha]
Мне не нужен другой проводник в ночи
Кроме ритма в моём сердце,
Да, он хранит во мне жизнь,
Хранит во мне жизнь.
Мне не нужно ничего для удовольствия, понимаете,
Потому что музыка питает меня и всегда трогает.
`;

class Line {
    constructor(public en:TextLine = null, public ru:TextLine = null) {
        if (!en) {
            this.en = new TextLine(Lang.EN, null, null, null);
        }
        if (!ru) {
            this.ru = new TextLine(Lang.RU, null, null, null);
        }
    }

    getTextLine(lang:Lang) {
        return lang == Lang.EN ? this.en : this.ru;
    }

    isEmpty() {
        return this.en.isEmpty() && this.ru.isEmpty();
    }

    setTextLine(lang:Lang, textLine:TextLine) {
        if (lang == Lang.EN) {
            this.en = textLine;
        } else {
            this.ru = textLine;
        }
    }
}

const enum Lang{
    EN = 1,
    RU = 2
}
class TextLine {
    words:Word[];

    getWord(i:number) {
        return this.words[i];
    }

    isEmpty() {
        return this.getWord(0).isEmpty;
    }

    private text:string;

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

class Word {
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
var enLinesS = parse(en);
var ruLinesS = parse(ru);
var lines = enLinesS.map((lineS, i) =>
    new Line(
        new TextLine(Lang.EN, null, null, lineS.split(/\s+/).map(w => new Word(w))),
        new TextLine(Lang.RU, null, null, ruLinesS[i].split(/\s+/).map(w => new Word(w)))));

const enum EditorAction{
    SPLIT      = 1,
    SPLIT_MOVE = 2,
    JOIN       = 3,
    JOIN_MOVE  = 4
}

class EditorHistory {
    action:EditorAction;
    linePos:number;
    lang:Lang;
    wordPos:number;
}

class Selection {
    line:Line;
    linePos:number;
    textLine:TextLine;
    lang:Lang;
    word:Word;
    wordPos:number;

    constructor(public lines:Line[]) {}

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

enum KeyCodes{
    ENTER     = 13,
    BACKSPACE = 8,
    UP        = 38,
    DOWN      = 40,
    RIGHT     = 39,
    LEFT      = 37,
    Z         = 90,

}

export class Editor extends React.Component<{params: any, resolved: PostModel},{}> {
    lines:Line[] = lines;
    selection = new Selection(this.lines);

    static load(params:any) {
        return PostModel.fetch(params.id);
    }

    findClosestNextWord(currWord:Word, nextTextLine:TextLine) {
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
        var origWords = sel.textLine.words.slice();

        var lastLine = this.lines[this.lines.length - 1];
        if (!lastLine.getTextLine(sel.lang).isEmpty()) {
            this.lines.push(new Line());
        }
        for (var i = this.lines.length - 1; i > sel.linePos; i--) {
            this.lines[i].setTextLine(sel.lang, this.lines[i - 1].getTextLine(sel.lang));
        }
        sel.line.setTextLine(sel.lang, new TextLine(sel.lang, null, null, origWords.slice(0, sel.wordPos)));

        var nextLinePos = sel.linePos + 1;
        var newLine = this.lines[nextLinePos];
        var selLine = newLine.getTextLine(sel.lang);
        selLine.setWords(origWords.slice(sel.wordPos));

        this.selection.set(nextLinePos, sel.lang, 0);
        return {action: EditorAction.SPLIT_MOVE, lang: sel.lang, linePos: nextLinePos, wordPos: 0};
    }

    undoSplitWithMove(undoItem:EditorHistory) {
        this.undoToModify(undoItem);
        this.joinLineWithMove();
    }

    splitIntoNewLine() {
        var sel = this.selection;
        var origWords = sel.textLine.words.slice();

        sel.textLine.setWords(origWords.slice(0, sel.wordPos));
        var nextLinePos = sel.linePos + 1;
        var nextLine = this.lines[nextLinePos];
        if (!nextLine.getTextLine(sel.lang).isEmpty()) {
            nextLine = new Line();
            this.lines.splice(nextLinePos, 0, nextLine);
        }
        nextLine.getTextLine(sel.lang).setWords(origWords.slice(sel.wordPos));
        this.selection.set(nextLinePos, sel.lang, 0);
        return {action: EditorAction.SPLIT, lang: sel.lang, linePos: nextLinePos, wordPos: 0};
    }

    undoSplitIntoNewLine(undoItem:EditorHistory) {
        this.undoToModify(undoItem);
        this.joinLine();
    }

    joinLine() {
        var sel = this.selection;
        var origWords = sel.textLine.words.slice();

        if (sel.linePos < 1) {
            return null;
        }
        var prevLinePos = sel.linePos - 1;
        var prevLine = this.lines[prevLinePos];
        var prevWords = prevLine.getTextLine(sel.lang).words;
        var newWords = [...prevWords, ...origWords];
        var textLine = new TextLine(sel.lang, null, null, newWords);
        prevLine.setTextLine(sel.lang, textLine);
        sel.textLine.setWords(null);
        if (sel.line.isEmpty()) {
            this.lines.splice(sel.linePos, 1);
        }
        var newWordPos = prevWords.length - (prevWords[0].isEmpty ? 1 : 0);
        this.selection.set(prevLinePos, sel.lang, newWordPos);
        return {action: EditorAction.JOIN, lang: sel.lang, linePos: prevLinePos, wordPos: newWordPos};
    }

    undoJoinLine(undoItem:EditorHistory) {
        this.undoToModify(undoItem);
        this.splitIntoNewLine();
    }

    undoToModify(undoItem:EditorHistory) {
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
            lastLine.setTextLine(lang, new TextLine(lang, null, null, null));
            if (lastLine.isEmpty()) {
                this.lines.pop();
            }
            undo.action = EditorAction.JOIN_MOVE;
            return undo;
        }
    }

    undoJoinLineWithMove(undoItem:EditorHistory) {
        this.undoToModify(undoItem);
        this.splitWithMove();
    }

    addUndo(undo:EditorHistory) {
        if (undo) {
            console.log("Action", undo);
            this.undoStack.push(undo);
        }
    }

    undoStack:EditorHistory[] = [];

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

    keyHandler = (e:KeyboardEvent) => {
        //console.log(e.keyCode);

        var handled = false;
        if (!this.selection.line || !this.selection.textLine) {
            this.selection.set(0, 0, 0);
        }

        var keyCode = e.keyCode;
        var isCtrl = e.metaKey || e.ctrlKey;
        if (keyCode == KeyCodes.ENTER) {
            if (e.shiftKey) {
                this.addUndo(this.splitIntoNewLine());
            }
            else {
                this.addUndo(this.splitWithMove());
            }
            handled = true;
        }

        if (keyCode == KeyCodes.BACKSPACE) {
            if (e.shiftKey) {
                this.addUndo(this.joinLine());
            }
            else {
                this.addUndo(this.joinLineWithMove());
            }
            handled = true;
        }

        if (keyCode == KeyCodes.Z && isCtrl) {
            this.undo();
            handled = true;
        }
        if (keyCode == KeyCodes.LEFT) {
            this.left();
            handled = true;
        }
        if (keyCode == KeyCodes.RIGHT) {
            this.right();
            handled = true;
        }
        if (keyCode == KeyCodes.UP) {
            this.up();
            handled = true;
        }
        if (keyCode == KeyCodes.DOWN) {
            this.down();
            handled = true;
        }

        if (handled) {
            this.forceUpdate();
            e.preventDefault();
            this.scroll();
        }
    };

    private scroll() {
        var wordSpan = this.selection.word.span as HTMLElement;
        var rect = wordSpan.getBoundingClientRect();

        if (rect.top < 0) {
            wordSpan.scrollIntoView(true);
        }
        if (rect.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
            wordSpan.scrollIntoView(false);
        }
    };

    private left() {
        if (this.selection.wordPos <= 0) {
            return false;
        }
        this.selection.setWord(this.selection.wordPos - 1);
        return true;
    };

    private right() {
        if (this.selection.wordPos >= this.selection.textLine.words.length - 1) {
            return false;
        }
        this.selection.setWord(this.selection.wordPos + 1);
        return true;
    };

    componentDidMount() {
        document.addEventListener('keydown', this.keyHandler);
    }

    spanClassName(textLine:TextLine, word:Word) {
        return classNames({'selected': this.selection.word == word && this.selection.textLine == textLine});
    }

    setWordNode(word:Word, node:React.DOMComponent<{}>) {
        word.span = React.findDOMNode(node);
    }

    wordClick(e:React.MouseEvent, linePos:number, lang:Lang, wordPos:number) {
        this.selection.set(linePos, lang, wordPos);
        this.forceUpdate();
        e.preventDefault();
        e.stopPropagation();
    }

    textLineClick(linePos:number, lang:Lang) {
        this.selection.set(linePos, lang, 0);

        //this.selectedWordPos = 0;
        this.forceUpdate()
    }

    render() {
        return <div>
            {this.lines.map((line,linePos) => <div className="line">
            <div className="textline en" onClick={()=>this.textLineClick(linePos,Lang.EN)}>
        {line.en.words.map((w,wordPos) =>
            <span className={this.spanClassName(line.en, w)} ref={node => this.setWordNode(w, node)}
            onClick={e=>this.wordClick(e, linePos, Lang.EN, wordPos)}>{w.word}</span>)}
        </div>
        <div className="textline ru" onClick={()=>this.textLineClick(linePos, Lang.RU)}>
        {line.ru.words.map((w,wordPos) =>
            <span className={this.spanClassName(line.ru, w)} ref={node => this.setWordNode(w, node)}
            onClick={e=>this.wordClick(e, linePos, Lang.RU, wordPos)}>{w.word}</span>)}
        </div>
        </div>)}
        </div>
    }

}
