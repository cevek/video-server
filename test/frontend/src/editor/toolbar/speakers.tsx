import * as React from "react";
import {EditorModel} from "../editor-model";
import {EditorToolbarSpeaker} from "./speaker";
import "./speakers.css";

export class EditorToolbarSpeakers extends React.Component<{model: EditorModel, onUpdate: ()=>void}, {}> {
    render() {
        var model = this.props.model;
        return <div className="speakers">
            <h3>Speakers</h3>
            {model.speakers.map((speaker, pos) =>
                <EditorToolbarSpeaker model={model} speaker={speaker} pos={pos} onUpdate={this.props.onUpdate}/>
            )}
            <EditorToolbarSpeaker model={model} speaker={""} addMode={true} pos={model.speakers.length}
                                  onUpdate={this.props.onUpdate}/>
        </div>;
    }
}

