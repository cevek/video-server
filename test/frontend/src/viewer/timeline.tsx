import * as React from "react";
import {AudioSelection} from "./audio-selection";
import {AudioPlayer} from "../utils/audio-player";
import  * as style from "./timeline.css";
import {AudioSelectionData} from "../audio-selection-model";

export class Timeline extends React.Component<{player: AudioPlayer; audioSelectionModel: AudioSelectionData; resizeKoef: number}, {}> {
    render() {
        return <div className={style.timeline} ref="timeline">
            <AudioSelection audioSelectionModel={this.props.audioSelectionModel} pxPerSec={100 / this.props.resizeKoef} player={this.props.player}/>
        </div>
    }
}
