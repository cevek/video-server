import * as React from "react";
import {EditorToolbarSpeaker} from "./Speaker";
import "./styles/speakers.scss";
import {autowatch} from "atom-next";
import {EditorModel} from "../../models/Editor/EditorModel";

@autowatch
export class EditorToolbarSpeakers extends React.Component<{model: EditorModel}, {}> {
    render() {
        var model = this.props.model;
        return <div className="speakers">
            <h3>Speakers</h3>
            {model.post.speakers.list.map((speaker, pos) =>
                <EditorToolbarSpeaker key={speaker.id} model={model} speaker={speaker} pos={pos}/>
            )}
            <EditorToolbarSpeaker model={model} speaker={null} addMode={true} pos={model.post.speakers.list.length}/>
        </div>;
    }
}

