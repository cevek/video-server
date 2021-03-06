import * as React from "react";
import "./styles/editor-tags.scss";
import {autowatch} from "atom-next";
import {TextInput} from "../form";
import {EditorModel} from "../models/Editor/EditorModel";

@autowatch
export class EditorTags extends React.Component<{model: EditorModel},{}> {
    onChange = (val: string) => {
        this.props.model.post.setTags(val);
    }

    render() {
        return <div className="editor-tags">
            <TextInput placeholder="Tags..." name="title" required onChange={this.onChange} value={this.props.model.post.tags}/>
        </div>
    }
}