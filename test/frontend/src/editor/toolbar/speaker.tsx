import * as React from "react";
import {EditorModel} from "../editor-model";
import "./speaker.css";
import {prop, autowatch} from "../../../models";

@autowatch
export class EditorToolbarSpeaker extends React.Component<{model:EditorModel; addMode?:boolean; speaker:string; pos:number;}, {}> {
    @prop editMode = false;

    onRemove(pos:number) {
        this.props.model.speakers.remove(pos)
    }

    onEdit() {
        this.editMode = true;
    }

    onSave(pos:number) {
        this.editMode = false;
        this.props.model.speakers.save(pos, (this.refs['speaker'] as HTMLInputElement).value);
    }

    onCancel() {
        this.editMode = false;
    }

    render() {
        const speaker = this.props.speaker;
        const pos = this.props.pos;
        return <div className="speaker">
            {speaker}
            {this.editMode ?
                <div>
                    <input type="text" ref='speaker' value={speaker}/>
                    <button onClick={()=> this.onCancel()}>Cancel</button>
                    <button onClick={()=> this.onSave(pos)}>Save</button>
                </div>
                :
                <button onClick={()=> this.onEdit()}>{this.props.addMode ? 'Add' : 'Edit'}</button>
            }
            {this.props.addMode ? null
                : <button onClick={()=> this.onRemove(pos)}>X</button>}
        </div>
    }
}