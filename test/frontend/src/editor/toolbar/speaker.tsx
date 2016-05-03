import * as React from "react";
import {EditorModel} from "../editor-model";
import {locals} from "./styles/speaker.css";
import {prop} from "../../../atom-next/prop";
import {autowatch} from "../../../atom-next/autowatch";
import {Escape} from "../../escape";
import {Form, TextInput} from "../../form";
import {locals as i} from "../../font-awesome-4.6.1/css/font-awesome.css";
import {locals as glob} from "../styles/glob.css";

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
        return <div className={locals.speaker}>
            <Escape onEscape={this.onCancel}/>
            {this.editMode ?
                <div>
                    <Form values={this.values} onSubmit={this.onSave}>
                        <TextInput className={locals.speakerText} name="text" required value={speaker}/>
                        <button className={glob.iconButton}>
                            <i className={`${i.fa} ${i.faFloppyO}`}/>
                        </button>
                        <button className={glob.iconButton} type="button" onClick={this.onCancel}>
                            <i className={`${i.fa} ${i.faBan}`}/>
                        </button>
                    </Form>
                </div>
                :
                <div>
                    {speaker}
                    {this.props.addMode ?
                        <button onClick={this.onEdit}><i className={`${i.fa} ${i.faPlug}`}/> Add</button>
                        :
                        <button onClick={this.onEdit} className={glob.iconButton}>
                            <i className={`${i.fa} ${i.faPencilSquareO}`}/>
                        </button>
                    }
                    {this.props.addMode ? null
                        :
                        <button className={glob.iconButton} onClick={this.onRemove}>
                            <i className={`${i.fa} ${i.faTimes}`}/>
                        </button>
                    }
                </div>
            }
        </div>
    }
}