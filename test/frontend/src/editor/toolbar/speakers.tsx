import * as React from "react";
import {EditorModel} from "../editor-model";
import {EditorToolbarSpeaker} from "./speaker";
import "./speakers.css";
import {autowatch} from "../../../models";

@autowatch
export class EditorToolbarSpeakers extends React.Component<{model: EditorModel}, {}> {
    render() {
        var model = this.props.model;
        return <div className="speakers">
            <h3>Speakers</h3>
            {model.speakers.map((speaker, pos) =>
                <EditorToolbarSpeaker key={speaker} model={model} speaker={speaker} pos={pos}/>
            )}
            <EditorToolbarSpeaker model={model} speaker={""} addMode={true} pos={model.speakers.length}/>
        </div>;
    }
}

