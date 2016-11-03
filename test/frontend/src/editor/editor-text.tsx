import * as React from "react";
import * as classNames from "classnames";
import {EditorKeyHandler} from "./editor-key-handler";
import * as style from "./styles/editor-text.css";
import * as i from "../font-awesome-4.6.1/css/font-awesome.css";
import * as glob from "./styles/glob.css";
import {prop} from "atom-next";
import {autowatch} from "atom-next";
import {Escape} from "../escape";
import {Form, TextInput, FormField} from "../form";
import {EditorModel} from "../models/Editor/EditorModel";
import {EditorLine} from "../models/Editor/EditorLine";
import {EditorTextLine} from "../models/Editor/EditorTextLine";
import {EditorWord} from "../models/Editor/EditorWord";
import {Speaker} from "../models/Speaker";
import {Lang} from "../models/Lang";

export interface EditorTextProps {
    model: EditorModel
}

@autowatch
export class EditorText extends React.Component<EditorTextProps, {}> {
    @prop model = this.props.model;

    render() {
        return <div className={style.editorText}>
            <EditorKeyHandler model={this.model} />

            {this.model.post.lines.map((line, linePos) =>
                <div className={style.line} key={linePos} style={{top: this.model.renderLines[linePos].top}}>
                    <Speakers model={this.model} linePos={linePos} />
                    <TextLine model={this.model} line={line} linePos={linePos} lang={Lang.EN} />
                    <TextLine model={this.model} line={line} linePos={linePos} lang={Lang.RU} />
                </div>
            )}
        </div>
    }
}

@autowatch
class Speakers extends React.Component<{model: EditorModel; linePos: number;},{}> {
    setSpeaker(pos: number, speaker: Speaker) {
        this.props.model.textModel.setSpeaker(pos, speaker);
    }

    render() {
        const line = this.props.model.post.lines[this.props.linePos];
        return <div className={style.speakers}>
            {this.props.model.post.speakers.list.map(speaker =>
                <div key={speaker.id} className={classNames(style.speaker, {[style.selected]: speaker == line.speaker})}
                     onClick={()=>this.setSpeaker(this.props.linePos, speaker)}>{speaker}</div>
            )}
        </div>

    }
}

@autowatch
class TextLine extends React.Component<{model: EditorModel; line: EditorLine; linePos: number; lang: Lang;},{}> {
    spanClassName(textLine: EditorTextLine, word: EditorWord) {
        return classNames({[style.selected]: this.props.model.textModel.selection.word == word && this.props.model.textModel.selection.textLine == textLine});
    }

    setWordNode(word: EditorWord, node: HTMLElement) {
        word.span = node;
    }

    onWordClick(e: React.MouseEvent<{}>, linePos: number, lang: Lang, wordPos: number) {
        this.props.model.textModel.selection.set(linePos, lang, wordPos);
        e.preventDefault();
        e.stopPropagation();
    }

    onTextLineClick = () => {
        this.props.model.textModel.selection.set(this.props.linePos, this.props.lang, 0);
        //this.selectedWordPos = 0;
    }

    @prop editMode = false;

    @prop values = {text: new FormField('')}

    onEdit = () => {
        this.editMode = true;
        const line = this.props.line;
        const lang = this.props.lang;
        this.values.text.value = line.getTextLine(lang).getText();
    }

    onSave = () => {
        this.editMode = false;
        this.props.model.textModel.setWords(this.props.linePos, this.props.lang, this.values.text.value);
    }

    onCancel = () => {
        this.editMode = false;
    }

    render() {
        const line = this.props.line;
        const linePos = this.props.linePos;
        const lang = this.props.lang;
        const textLine = lang == Lang.RU ? line.ru : line.en; // todo


        return  <div className={`${style.textline} ${style.ru}`}
                     onClick={this.onTextLineClick}>
            <Escape onEscape={this.onCancel} />
            <i className={`${i.fa} ${i.faPencilSquareO} ${style.textlineEditbutton}`} onClick={this.onEdit} />
            {this.editMode ?
                <div className={style.textlineEdit}>
                    <Form onSubmit={this.onSave}>
                        <TextInput className={style.speakerText} name="text" required />
                        <button className={glob.iconButton}><i className={`${i.fa} ${i.faFloppyO}`} /></button>
                        <button className={glob.iconButton} type="button" onClick={this.onCancel}><i
                            className={`${i.fa} ${i.faBan}`} /></button>
                    </Form>
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