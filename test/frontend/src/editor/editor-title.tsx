import * as React from "react";
import {EditorModel} from "./editor-model";
import "./styles/editor-title.css";
import {autowatch} from "../../models";

@autowatch
export class EditorTitle extends React.Component<{model:EditorModel},{}> {
    onChange = () => {
        this.props.model.setTitle((this.refs['input'] as HTMLInputElement).value);
    }

    render() {
        return <div className="editor-title">
            <input type="text" onChange={this.onChange} ref="input" value={this.props.model.title}/>
        </div>
    }
}