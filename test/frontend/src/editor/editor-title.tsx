import * as React from "react";
import {EditorModel} from "./editor-model";
import "./styles/editor-title.css";
import {autowatch} from "../../atom-next/autowatch";
import {TextInput} from "../form";

@autowatch
export class EditorTitle extends React.Component<{model:EditorModel},{}> {
    onChange = (val: string) => {
        this.props.model.setTitle(val);
    }

    render() {
        return <div className="editor-title">
            <TextInput placeholder="Title..." name="title" onChange={this.onChange} value={this.props.model.title}/>
        </div>
    }
}