import * as React from "react";
import {EditorModel} from "./../editor-model";
import {EditorToolbarSpeakers} from "./speakers";
import * as style from "./styles/toolbar.css";
import {autowatch} from "atom-next";

@autowatch
export class EditorToolbar extends React.Component<{model: EditorModel;}, {}> {
    onSave = () => {
        return this.props.model.save();
    }

    onUndo = () => {
        this.props.model.history.undo();
    }

    onRedo = () => {
        this.props.model.history.redo();
    }

    render() {
        return <div className={style.editorToolbar}>
            <button onClick={this.onSave}>Save</button>
            <div>
                <button onClick={this.onUndo}>Undo</button>
                <button onClick={this.onRedo}>Redo</button>
            </div>
            <EditorToolbarSpeakers model={this.props.model}/>
        </div>
    }
}