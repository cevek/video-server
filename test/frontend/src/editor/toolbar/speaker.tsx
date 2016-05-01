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
            {this.editMode ?
                <div>
                    <Form values={this.values} onSubmit={this.onSave}>
                        <TextInput className="speaker-text" name="text" required value={speaker}/>
                        <button className="icon-button"><i className="fa fa-floppy-o"/></button>
                        <button className="icon-button" type="button" onClick={this.onCancel}><i className="fa fa-ban"/></button>
                    </Form>
                </div>
                :
                <div>
                    {speaker}
                    {this.props.addMode ?
                        <button onClick={this.onEdit}><i className="fa fa-plus"/> Add</button>
                        :
                        <button onClick={this.onEdit} className="icon-button"><i className="fa fa-pencil-square-o"/></button>
                    }
                    {this.props.addMode ? null
                        : <button className="icon-button" onClick={this.onRemove}><i className="fa fa-times"/></button>
                    }
                </div>
            }
        </div>
    }
}