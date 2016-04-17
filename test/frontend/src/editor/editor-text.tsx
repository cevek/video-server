import * as React from "react";
import * as classNames from "classnames";
import {EditorModel, EditorTextLine, EditorWord, EditorLine} from "./editor-model";
import {Lang} from "../../../interfaces/lang";
import {EditorKeyHandler} from "./editor-key-handler";
import {Line} from "../models/line";
import "./styles/editor-text.css";
import {prop} from "../../atom-next/prop";
import {autowatch} from "../../atom-next/autowatch";

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
                <div className="line" key={linePos} style={{top: this.props.renderLines[linePos]}}>
                    <Speakers model={this.model} linePos={linePos}/>
                    <TextLine model={this.model} line={line} linePos={linePos} lang={Lang.EN}/>
                    <TextLine model={this.model} line={line} linePos={linePos} lang={Lang.RU}/>
                </div>
            )}
        </div>
    }
}

@autowatch
class Speakers extends React.Component<{model:EditorModel; linePos:number;},{}> {
    setSpeaker(pos:number, speaker:string) {
        console.log(pos, speaker);
        this.props.model.textModel.setSpeaker(pos, speaker);
    }

    render() {
        const line = this.props.model.lines[this.props.linePos];
        return <div className="speakers">
            {this.props.model.speakers.list.map(speaker =>
                <div key={speaker} className={classNames("speaker", {'selected': speaker == line.speaker})}
                     onClick={()=>this.setSpeaker(this.props.linePos, speaker)}>{speaker}</div>
            )}
        </div>

    }
}

@autowatch
class TextLine extends React.Component<{model:EditorModel; line:EditorLine; linePos:number; lang:Lang;},{}> {
    spanClassName(textLine:EditorTextLine, word:EditorWord) {
        return classNames({'selected': this.props.model.textModel.selection.word == word && this.props.model.textModel.selection.textLine == textLine});
    }

    setWordNode(word:EditorWord, node:HTMLElement) {
        word.span = node;
    }

    onWordClick(e:React.MouseEvent, linePos:number, lang:Lang, wordPos:number) {
        this.props.model.textModel.selection.set(linePos, lang, wordPos);
        e.preventDefault();
        e.stopPropagation();
    }

    onTextLineClick = () => {
        this.props.model.textModel.selection.set(this.props.linePos, this.props.lang, 0);
        //this.selectedWordPos = 0;
    }

    @prop editMode = false;

    onEdit = () => {
        this.editMode = true;
    }

    onSave = () => {
        this.editMode = false;
        this.props.model.textModel.setWords(this.props.linePos, this.props.lang, (this.refs['input'] as HTMLInputElement).value);
    }

    onCancel = () => {
        this.editMode = false;
    }

    render() {
        const line = this.props.line;
        const linePos = this.props.linePos;
        const lang = this.props.lang;
        const textLine = lang == Lang.RU ? line.ru : line.en; // todo
        return  <div className="textline ru" onClick={this.onTextLineClick}>
            <span onClick={this.onEdit} className="textline-editbutton">Edit</span>
            {this.editMode ?
                <div className="textline-edit">
                    <input type="text" ref="input" value={textLine.getText()}/>
                    <button onClick={this.onSave}>Save</button>
                    <button onClick={this.onCancel}>Cancel</button>
                </div>
                :
                textLine.words.map((w, wordPos) =>
                    <span className={this.spanClassName(textLine, w)} key={wordPos}
                          ref={node => this.setWordNode(w, node)}
                          onClick={e=>this.onWordClick(e, linePos, this.props.lang, wordPos)}>{w.word}</span>)
            }
        </div>

    }
}