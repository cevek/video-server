import * as React from "react";
import {EditorModel} from "./editor-model";
import "./styles/editor-tags.css";
import {autowatch} from "../../atom-next/autowatch";

@autowatch
export class EditorTags extends React.Component<{model: EditorModel},{}> {
    onChange = () => {
        this.props.model.setTags((this.refs['input'] as HTMLInputElement).value);
    }

    render() {
        return <div className="editor-tags">
            <input type="text" onChange={this.onChange} ref="input" value={this.props.model.tags}/>
        </div>
    }
}