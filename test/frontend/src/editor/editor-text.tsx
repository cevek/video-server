import * as React from "react";
import * as classNames from "classnames";
import {EditorModel, EditorTextLine, EditorWord, EditorLine} from "./editor-model";
import {Lang} from "../../../interfaces/lang";
import {EditorKeyHandler} from "./editor-key-handler";
import {Line} from "../models/line";
import "./editor-text.css";
import {BaseArray, prop, Atom, autowatch} from "../../models";

class User {
    @prop firstName:string;
    @prop lastName:string;

    @prop get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
const user = new User();
user.firstName = "John";
user.lastName = "Miller";


(window as any).user = user;
@autowatch
class Cmp {
    render() {
        console.log(user.fullName);
    }

    forceUpdate() {
        this.render();
    }
}

new Cmp().render();

@autowatch
export class EditorText extends React.Component<{model:EditorModel; renderLines:number[];}, {}> {
    @prop model = this.props.model;

    render() {
        return <div className="editor-text">
            <EditorKeyHandler model={this.model}/>

            {this.model.lines.map((line, linePos) =>
                <div className="line" style={{top: this.props.renderLines[linePos]}}>
                    <Speakers model={this.model} line={line}/>
                    <TextLine model={this.model} line={line} linePos={linePos} lang={Lang.EN}/>
                    <TextLine model={this.model} line={line} linePos={linePos} lang={Lang.RU}/>
                </div>
            )}
        </div>
    }
}

@autowatch
class Speakers extends React.Component<{model:EditorModel; line:EditorLine;},{}> {
    setSpeaker(line:Line, speaker:string) {
        line.speaker = speaker;
    }

    render() {
        const line = this.props.line;
        return <div className="speakers">
            {this.props.model.speakers.map(speaker =>
                <div className={classNames("speaker", {'selected': speaker == line.speaker})}
                     onClick={()=>this.setSpeaker(line, speaker)}>{speaker}</div>
            )}
        </div>

    }
}

@autowatch
class TextLine extends React.Component<{model:EditorModel; line:EditorLine; linePos:number; lang:Lang;},{}> {
    setSpeaker(line:Line, speaker:string) {
        line.speaker = speaker;
    }

    spanClassName(textLine:EditorTextLine, word:EditorWord) {
        return classNames({'selected': this.props.model.textModel.selection.word == word && this.props.model.textModel.selection.textLine == textLine});
    }

    setWordNode(word:EditorWord, node:React.DOMComponent<{}>) {
        word.span = React.findDOMNode(node);
    }

    onWordClick(e:React.MouseEvent, linePos:number, lang:Lang, wordPos:number) {
        this.props.model.textModel.selection.set(linePos, lang, wordPos);
        e.preventDefault();
        e.stopPropagation();
    }

    onTextLineClick(linePos:number, lang:Lang) {
        this.props.model.textModel.selection.set(linePos, lang, 0);
        //this.selectedWordPos = 0;
    }

    render() {
        const line = this.props.line;
        const linePos = this.props.linePos;
        const lang = this.props.lang;
        const textLine = lang == Lang.RU ? line.ru : line.en; // todo
        return  <div className="textline ru" onClick={()=>this.onTextLineClick(linePos, lang)}>
            {textLine.words.map((w, wordPos) =>
                <span className={this.spanClassName(textLine, w)} ref={node => this.setWordNode(w, node)}
                      onClick={e=>this.onWordClick(e, linePos, this.props.lang, wordPos)}>{w.word}</span>)}
        </div>

    }
}