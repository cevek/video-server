import * as React from "react";
import * as classNames from "classnames";
import {EditorModel, EditorTextLine, EditorWord, EditorLine} from "./editor-model";
import {Lang} from "../../../interfaces/lang";
import {EditorKeyHandler} from "./editor-key-handler";
import {Line} from "../models/line";
import "./editor-text.css";

export class EditorText extends React.Component<{model:EditorModel; renderLines:number[]; onChange:()=>void}, {}> {
    model = this.props.model;

    render() {
        return <div className="editor-text">
            <EditorKeyHandler model={this.model} onAction={this.props.onChange}/>

            {this.model.lines.map((line, linePos) =>
                <div className="line" style={{top: this.props.renderLines[linePos]}}>
                    <Speakers model={this.model} line={line} onUpdate={()=>this.forceUpdate()}/>
                    <TextLine model={this.model} line={line} linePos={linePos} lang={Lang.EN} onUpdate={()=>this.forceUpdate()}/>
                    <TextLine model={this.model} line={line} linePos={linePos} lang={Lang.RU} onUpdate={()=>this.forceUpdate()}/>
                </div>
            )}
        </div>
    }
}

class Speakers extends React.Component<{model: EditorModel; line: EditorLine; onUpdate: ()=>void},{}> {
    setSpeaker(line:Line, speaker:string) {
        line.speaker = speaker;
        this.props.onUpdate();
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

class TextLine extends React.Component<{model: EditorModel; line: EditorLine; linePos: number; lang: Lang; onUpdate: ()=>void},{}> {
    setSpeaker(line:Line, speaker:string) {
        line.speaker = speaker;
        this.props.onUpdate();
    }

    spanClassName(textLine:EditorTextLine, word:EditorWord) {
        return classNames({'selected': this.props.model.textModel.selection.word == word && this.props.model.textModel.selection.textLine == textLine});
    }

    setWordNode(word:EditorWord, node:React.DOMComponent<{}>) {
        word.span = React.findDOMNode(node);
    }

    onWordClick(e:React.MouseEvent, linePos:number, lang:Lang, wordPos:number) {
        this.props.model.textModel.selection.set(linePos, lang, wordPos);
        this.forceUpdate();
        e.preventDefault();
        e.stopPropagation();
    }

    onTextLineClick(linePos:number, lang:Lang) {
        this.props.model.textModel.selection.set(linePos, lang, 0);
        //this.selectedWordPos = 0;
        this.props.onUpdate();
    }

    render() {
        const line = this.props.line;
        const linePos = this.props.linePos;
        const lang = this.props.lang;
        const textLine = lang == Lang.RU ? line.ru : line.en; // todo
        return  <div className="textline ru" onClick={()=>this.onTextLineClick(linePos, lang)}>
            {textLine.words.map((w,wordPos) =>
                <span className={this.spanClassName(textLine, w)} ref={node => this.setWordNode(w, node)}
                      onClick={e=>this.onWordClick(e, linePos, this.props.lang, wordPos)}>{w.word}</span>)}
        </div>

    }
}