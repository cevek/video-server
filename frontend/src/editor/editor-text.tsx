import * as React from "react";
import * as classNames from "classnames";
import {EditorKeyHandler} from "./editor-key-handler";
import {prop, autowatch} from "atom-next";
import {Form, TextInput, FormField} from "../form";
import {EditorModel} from "../models/Editor/EditorModel";
import {EditorTextLine} from "../models/Editor/EditorTextLine";
import {EditorWord} from "../models/Editor/EditorWord";
import {Speaker} from "../models/Speaker";
import {Lang} from "../models/Lang";
import "./styles/editor-text.scss";
import {DocKey} from "../lib/DocKey";

export interface EditorTextProps {
    model: EditorModel
}

@autowatch
export class EditorText extends React.Component<EditorTextProps, {}> {
    @prop model = this.props.model;

    render() {
        return <div className="editor-text">
            <EditorKeyHandler model={this.model}/>

            {this.model.post.enLines.map((en, linePos) => {
                    const speaker = this.model.post.speakerLines.get(linePos);
                    return <div className="editor-text__line" key={linePos}
                                style={{top: this.model.renderLines[linePos].top}}>
                        <Speakers model={this.model} linePos={linePos}/>
                        <div className="editor-text__speaker_photo"
                             title={speaker.name}
                             style={{backgroundImage: 'url('+speaker.photo+ ')' }}>
                        </div>
                        <TextLine model={this.model} textLine={en} linePos={linePos}/>
                        <TextLine model={this.model} textLine={this.model.post.ruLines.get(linePos)} linePos={linePos}/>
                    </div>;
                }
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
        return <div className="editor-text__speakers">
            {/*
             {this.props.model.post.speakers.list.map(speaker =>
             <div key={speaker.id} className={classNames(style.speaker, {[style.selected]: speaker == line.speaker})}
             onClick={()=>this.setSpeaker(this.props.linePos, speaker)}>{speaker}</div>
             )}
             */}
        </div>

    }
}

interface TextLineProps {
    model: EditorModel;
    textLine: EditorTextLine;
    // line: EditorLine;
    linePos: number;
    // lang: Lang;
}

@autowatch
class TextLine extends React.Component<TextLineProps,{}> {
    onKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode == 27) {
            this.onCancel();
        }
    }

    spanClassName(textLine: EditorTextLine, word: EditorWord) {
        return classNames(word.selected && 'editor-text__selected-word');
    }

    setWordNode(word: EditorWord, node: HTMLElement) {
        word.span = node;
    }

    onWordClick(e: React.MouseEvent<{}>, linePos: number, textLine: EditorTextLine, wordPos: number) {
        this.props.model.textModel.selection.set(linePos, textLine, wordPos);
        e.preventDefault();
        e.stopPropagation();
    }

    onTextLineClick = () => {
        const {model, textLine, linePos} = this.props;
        model.textModel.selection.set(linePos, textLine, 0);
        //this.selectedWordPos = 0;
    }

    @prop editMode = false;

    @prop values = {text: new FormField('')}

    onEdit = () => {
        this.editMode = true;
        // const line = this.props.line;
        // const lang = this.props.lang;
        this.values.text.value = this.props.textLine.getText();
    };

    onSave = () => {
        this.editMode = false;
        const {model, linePos, textLine} = this.props;
        model.textModel.setWords(linePos, textLine.lang, this.values.text.value);
    }

    onCancel = () => {
        this.editMode = false;
    }

    render() {
        // const line = this.props.line;
        // const lang = this.props.lang;
        // const textLine = lang == Lang.RU ? line.ru : line.en; // todo
        const {textLine, linePos} = this.props;
        return  <div
            className={`editor-text__textline ${textLine.lang == Lang.EN ? 'editor-text__en' : 'editor-text__ru'}`}
            onClick={this.onTextLineClick}>
            <DocKey onKeyDown={this.onKeyDown}/>
            <i className="fa fa-pencil-square-o editor-text__editbutton" onClick={this.onEdit}/>
            {this.editMode ?
                <div className="editor-text__editbutton">
                    <Form onSubmit={this.onSave}>
                        <TextInput className="editor-text__speaker-text" name="text" required/>
                        <button className="icon-button"><i className="fa fa-floppy-o"/></button>
                        <button className="icon-button" type="button" onClick={this.onCancel}><i
                            className="fa fa-ban"/></button>
                    </Form>
                </div>
                :
                textLine.words.map((w, wordPos) =>
                    <span className={this.spanClassName(textLine, w)} key={wordPos}
                          ref={node => this.setWordNode(w, node)}
                          onClick={e=>this.onWordClick(e, linePos, textLine, wordPos)}>{w.word}</span>)
            }
        </div>

    }
}