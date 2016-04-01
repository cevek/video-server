import * as React from "react";
import {EditorModel} from "./../editor-model";
import {EditorToolbarSpeakers} from "./speakers";
import "./toolbar.css";

export class EditorToolbar extends React.Component<{model: EditorModel; onUpdate: ()=>void}, {}> {
    onSave = () => {
        return this.props.model.save();
    }

    render() {
        return <div className="editor-toolbar">
            <button onClick={this.onSave}>Save</button>
            <EditorToolbarSpeakers model={this.props.model} onUpdate={this.props.onUpdate}/>
        </div>
    }
}