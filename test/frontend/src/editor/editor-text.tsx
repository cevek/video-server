import * as React from "react";
import * as classNames from "classnames";
import {EditorModel, EditorTextLine, EditorWord} from "./editor-model";
import {Lang} from "../../../interfaces/lang";
import {EditorKeyHandler} from "./editor-key-handler";
import "./editor-text.css";

export class EditorText extends React.Component<{model: EditorModel; renderLines: number[]; onChange:()=>void}, {}> {
    model = this.props.model;

    spanClassName(textLine:EditorTextLine, word:EditorWord) {
        return classNames({'selected': this.model.textModel.selection.word == word && this.model.textModel.selection.textLine == textLine});
    }

    setWordNode(word:EditorWord, node:React.DOMComponent<{}>) {
        word.span = React.findDOMNode(node);
    }

    onWordClick(e:React.MouseEvent, linePos:number, lang:Lang, wordPos:number) {
        this.model.textModel.selection.set(linePos, lang, wordPos);
        this.forceUpdate();
        e.preventDefault();
        e.stopPropagation();
    }

    onTextLineClick(linePos:number, lang:Lang) {
        this.model.textModel.selection.set(linePos, lang, 0);
        //this.selectedWordPos = 0;
        this.forceUpdate()
    }

    render() {
        return <div className="editor-text">
            <EditorKeyHandler model={this.model} onAction={this.props.onChange}/>

            {this.model.lines.map((line, linePos) => <div className="line" style={{top: this.props.renderLines[linePos]}}>
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
