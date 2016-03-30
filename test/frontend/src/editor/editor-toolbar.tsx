import * as React from "react";
import {EditorModel} from "./editor-model";
import "./editor-toolbar.css";

export class EditorToolbar extends React.Component<{model: EditorModel}, {}> {
    onSave = () => {
        return this.props.model.save();
    }

    render() {
        return <div className="editor-toolbar">
            <button onClick={this.onSave}>Save</button>
        </div>
    }
}