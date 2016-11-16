import * as React from "react";
import {AudioSelection} from "./audio-selection";
import {EditorModel} from "../models/Editor/EditorModel";
import './timeline.scss'

export class Timeline extends React.Component<{model: EditorModel}, {}> {
    render() {
        const model = this.props.model;
        return <div className="timeline" ref="timeline">
            <AudioSelection audioSelectionModel={model.audioSelection} pxPerSec={model.lineCalc.timeToPx(1)} player={model.player}/>
        </div>
    }
}
