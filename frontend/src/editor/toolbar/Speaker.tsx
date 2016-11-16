import * as React from "react";
import "./styles/speaker.scss";
import {prop, autowatch} from "atom-next";
import {Form, TextInput, FormField} from "../../form";
import {Speaker} from "../../models/Speaker";
import {EditorModel} from "../../models/Editor/EditorModel";
import {DocKey} from "../../lib/DocKey";

@autowatch
export class EditorToolbarSpeaker extends React.Component<{model: EditorModel; addMode?: boolean; speaker: Speaker; pos: number;}, {}> {
    @prop editMode = false;

    onRemove = () => {
        const pos = this.props.pos;
        this.props.model.post.speakers.remove(pos)
    }

    onEdit = () => {
        this.editMode = true;
    }

    onSave = () => {
        const pos = this.props.pos;
        this.editMode = false;
        //todo:
        // this.props.model.post.speakers.save(pos, this.values.text.value);
    }


    values = {text: new FormField<string>('')};
    onKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode == 27) {
            this.onCancel();
        }
    }

    onCancel = () => {
        this.editMode = false;
    }

    render() {
        const speaker = this.props.speaker;

        return <div className="speaker">
            <DocKey onKeyDown={this.onKeyDown}/>
            {this.editMode ?
                <div>
                    <Form onSubmit={this.onSave}>
                        <TextInput className="speaker__text" field={this.values.text} required value={speaker}/>
                        <button className="icon-button">
                            <i className="fa fa-floppy-o"/>
                        </button>
                        <button className="icon-button" type="button" onClick={this.onCancel}>
                            <i className="fa fa-ban"/>
                        </button>
                    </Form>
                </div>
                :
                <div>
                    {speaker}
                    {this.props.addMode ?
                        <button onClick={this.onEdit}><i className="fa fa-plus"/> Add</button>
                        :
                        <button onClick={this.onEdit} className="icon-button">
                            <i className="fa fa-pencil-square-o"/>
                        </button>
                    }
                    {this.props.addMode ? null
                        :
                        <button className="icon-button" onClick={this.onRemove}>
                            <i className="fa fa-times"/>
                        </button>
                    }
                </div>
            }
        </div>
    }
}