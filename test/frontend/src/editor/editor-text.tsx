import * as React from "react";
import * as classNames from "classnames";
import {EditorModel, EditorTextLine, EditorWord, EditorLine} from "./editor-model";
import {Lang} from "../../../interfaces/lang";
import {EditorKeyHandler} from "./editor-key-handler";
import {Line} from "../models/line";
import {locals} from "./styles/editor-text.css";
import {locals as i} from "../font-awesome-4.6.1/css/font-awesome.css";
import {locals as glob} from "./styles/glob.css";
import {prop} from "../../atom-next/prop";
import {autowatch} from "../../atom-next/autowatch";
import {Escape} from "../escape";
import {Form, TextInput} from "../form";

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
        return <div className={locals.editorText}>
            <EditorKeyHandler model={this.model}/>

            {this.model.lines.map((line, linePos) =>
                <div className={locals.line} key={linePos} style={{top: this.props.renderLines[linePos]}}>
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
        this.props.model.textModel.setSpeaker(pos, speaker);
    }

    render() {
        const line = this.props.model.lines[this.props.linePos];
        return <div className={locals.speakers}>
            {this.props.model.speakers.list.map(speaker =>
                <div key={speaker} className={classNames(locals.speaker, {[locals.selected]: speaker == line.speaker})}
                     onClick={()=>this.setSpeaker(this.props.linePos, speaker)}>{speaker}</div>
            )}
        </div>

    }
}

@autowatch
class TextLine extends React.Component<{model:EditorModel; line:EditorLine; linePos:number; lang:Lang;},{}> {
    spanClassName(textLine:EditorTextLine, word:EditorWord) {
        return classNames({[locals.selected]: this.props.model.textModel.selection.word == word && this.props.model.textModel.selection.textLine == textLine});
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

    @prop values:{text:string}

    onEdit = () => {
        this.editMode = true;
        const line = this.props.line;
        const lang = this.props.lang;
        this.values = {
            text: line.getTextLine(lang).getText()
        }
    }

    onSave = () => {
        this.editMode = false;
        this.props.model.textModel.setWords(this.props.linePos, this.props.lang, this.values.text);
    }

    onCancel = () => {
        this.editMode = false;
    }

    render() {
        const line = this.props.line;
        const linePos = this.props.linePos;
        const lang = this.props.lang;
        const textLine = lang == Lang.RU ? line.ru : line.en; // todo


        return  <div className={`${locals.textline} ${locals.ru}`} onClick={this.onTextLineClick}>
            <Escape onEscape={this.onCancel}/>
            <i className={`${i.fa} ${i.faPencilSquareO} ${locals.textlineEditbutton}`} onClick={this.onEdit}/>
            {this.editMode ?
                <div className={locals.textlineEdit}>
                    <Form values={this.values} onSubmit={this.onSave}>
                        <TextInput className={locals.speakerText} name="text" required/>
                        <button className={glob.iconButton}><i className={`${i.fa} ${i.faFloppyO}`}/></button>
                        <button className={glob.iconButton} type="button" onClick={this.onCancel}><i className={`${i.fa} ${i.faBan}`}/></button>
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