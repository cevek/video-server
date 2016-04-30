import * as React from "react";
import {EditorModel} from "./editor-model";
import "./styles/editor-tags.css";
import {autowatch} from "../../atom-next/autowatch";
import {TextInput} from "../form";

@autowatch
export class EditorTags extends React.Component<{model: EditorModel},{}> {
    onChange = (val: string) => {
        this.props.model.setTags(val);
    }

    render() {
        return <div className="editor-tags">
            <TextInput placeholder="Tags..." name="title" onChange={this.onChange} value={this.props.model.tags}/>
        </div>
    }
}