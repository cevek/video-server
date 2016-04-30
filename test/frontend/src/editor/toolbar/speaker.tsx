import * as React from "react";
import {EditorModel} from "../editor-model";
import "./styles/speaker.css";
import {prop} from "../../../atom-next/prop";
import {autowatch} from "../../../atom-next/autowatch";
import {Escape} from "../../escape";
import {Form, TextInput} from "../../form";

@autowatch
export class EditorToolbarSpeaker extends React.Component<{model:EditorModel; addMode?:boolean; speaker:string; pos:number;}, {}> {
    @prop editMode = false;

    onRemove = () => {
        const pos = this.props.pos;
        this.props.model.speakers.remove(pos)
    }

    onEdit = () => {
        this.editMode = true;
    }

    onSave = () => {
        const pos = this.props.pos;
        this.editMode = false;
        this.props.model.speakers.save(pos, this.values.text);
    }

    onCancel = () => {
        this.editMode = false;
    }

    values = {text: ''};

    render() {
        const speaker = this.props.speaker;
        return <div className="speaker">
            <Escape onEscape={this.onCancel}/>
            {speaker}
            {this.editMode ?
                <div>
                    <Form values={this.values} onSubmit={this.onSave}>
                        <TextInput name="text" value={speaker}/>
                    </Form>
                    <button onClick={this.onCancel}>Cancel</button>
                    <button onClick={this.onSave}>Save</button>
                </div>
                :
                <button onClick={this.onEdit}>{this.props.addMode ? 'Add' : 'Edit'}</button>
            }
            {this.props.addMode ? null
                : <button onClick={this.onRemove}>X</button>
            }
        </div>
    }
}