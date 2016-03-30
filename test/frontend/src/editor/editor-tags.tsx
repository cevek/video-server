import * as React from "react";
import {EditorModel} from "./editor-model";
import "./editor-tags.css";

export class EditorTags extends React.Component<{model: EditorModel},{}> {
    render() {
        return <div className="editor-tags">
            <input type="text" value={this.props.model.title}/>
        </div>
    }
}