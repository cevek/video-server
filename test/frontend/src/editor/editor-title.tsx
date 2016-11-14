import * as React from "react";
import "./styles/editor-title.scss";
import {autowatch} from "atom-next";
import {TextInput} from "../form";
import {EditorModel} from "../models/Editor/EditorModel";

@autowatch
export class EditorTitle extends React.Component<{model:EditorModel},{}> {
    onChange = (val: string) => {
        this.props.model.post.setTitle(val);
    }

    render() {
        return <div className="editor-title">
            <TextInput placeholder="Title..." onChange={this.onChange} value={this.props.model.post.title}/>
        </div>
    }
}