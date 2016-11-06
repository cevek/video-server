import * as React from "react";
import {EditorToolbarSpeakers} from "./speakers";
import "./styles/toolbar.css";
import {autowatch} from "atom-next";
import {EditorModel} from "../../models/Editor/EditorModel";

@autowatch
export class EditorToolbar extends React.Component<{model: EditorModel;}, {}> {
    onSave = () => {
        return this.props.model.post.save();
    }

    onUndo = () => {
        this.props.model.history.undo();
    }

    onRedo = () => {
        this.props.model.history.redo();
    }

    render() {
        return <div className="editor-toolbar">
            <button onClick={this.onSave}>Save</button>
            <div>
                <button onClick={this.onUndo}>Undo</button>
                <button onClick={this.onRedo}>Redo</button>
            </div>
            <EditorToolbarSpeakers model={this.props.model}/>
        </div>
    }
}