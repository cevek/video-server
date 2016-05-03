import * as React from "react";
import {EditorModel} from "./editor-model";
import {locals} from "./styles/editor-tags.css";
import {autowatch} from "../../atom-next/autowatch";
import {TextInput} from "../form";

@autowatch
export class EditorTags extends React.Component<{model: EditorModel},{}> {
    onChange = (val: string) => {
        this.props.model.setTags(val);
    }

    render() {
        return <div className={locals.editorTags}>
            <TextInput placeholder="Tags..." name="title" required onChange={this.onChange} value={this.props.model.tags}/>
        </div>
    }
}