import * as React from "react";
import * as classNames from "classnames";
import {Lang} from "../../../interfaces/lang";
import {PostModel} from "./../models/post";
import {EditorModel, Word, TextLine} from "./editor-model";
import {EditorKeyHandler} from "./editor-key-handler";
import "./editor.css";

export class Editor extends React.Component<{params: any, resolved: EditorModel}, {}> {
    model = this.props.resolved;

    static load(params:any) {
        return PostModel.fetch(params.id).then(data => new EditorModel(data));
    }

    spanClassName(textLine:TextLine, word:Word) {
        return classNames({'selected': this.model.selection.word == word && this.model.selection.textLine == textLine});
    }

    setWordNode(word:Word, node:React.DOMComponent<{}>) {
        word.span = React.findDOMNode(node);
    }

    onWordClick(e:React.MouseEvent, linePos:number, lang:Lang, wordPos:number) {
        this.model.selection.set(linePos, lang, wordPos);
        this.forceUpdate();
        e.preventDefault();
        e.stopPropagation();
    }

    onTextLineClick(linePos:number, lang:Lang) {
        this.model.selection.set(linePos, lang, 0);
        //this.selectedWordPos = 0;
        this.forceUpdate()
    }

    render() {
        return <div className="editor">
            <EditorKeyHandler model={this.model} onAction={()=>this.forceUpdate()}/>
            {this.model.lines.map((line,linePos) => <div className="line">
                <div className="textline en" onClick={()=>this.onTextLineClick(linePos,Lang.EN)}>
                    {line.en.words.map((w,wordPos) =>
                    <span className={this.spanClassName(line.en, w)} ref={node => this.setWordNode(w, node)}
                          onClick={e=>this.onWordClick(e, linePos, Lang.EN, wordPos)}>{w.word}</span>)}
                </div>
                <div className="textline ru" onClick={()=>this.onTextLineClick(linePos, Lang.RU)}>
                    {line.ru.words.map((w,wordPos) =>
                    <span className={this.spanClassName(line.ru, w)} ref={node => this.setWordNode(w, node)}
                          onClick={e=>this.onWordClick(e, linePos, Lang.RU, wordPos)}>{w.word}</span>)}
                </div>
            </div>)}
        </div>
    }

}
