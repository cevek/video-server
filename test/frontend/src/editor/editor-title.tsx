import * as React from "react";
import {EditorModel} from "./editor-model";
import "./editor-title.css";
import {autowatch} from "../../models";

@autowatch
export class EditorTitle extends React.Component<{model:EditorModel},{}> {
    render() {
        return <div className="editor-title">
            <input type="text" value={this.props.model.tags}/>
        </div>
    }
}