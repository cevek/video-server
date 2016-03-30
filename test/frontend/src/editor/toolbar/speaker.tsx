import * as React from "react";
import {EditorModel} from "../editor-model";
import "./speaker.css";

export class EditorToolbarSpeaker extends React.Component<{model: EditorModel; addMode?: boolean; speaker: string; pos: number; onUpdate: ()=>void}, {}> {
    editMode = false;

    onRemove(pos:number) {
        this.props.model.speakers.splice(pos, 1);
        this.props.onUpdate();
    }

    onEdit() {
        this.editMode = true;
        this.props.onUpdate();
    }

    onSave(pos:number) {
        this.editMode = false;
        this.props.model.speakers[pos] = (React.findDOMNode(this.refs['speaker']) as HTMLInputElement).value;
        this.props.onUpdate();
    }

    onCancel() {
        this.editMode = false;
        this.props.onUpdate();
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