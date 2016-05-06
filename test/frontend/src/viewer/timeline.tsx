import * as React from "react";
import {AudioSelection} from "./audio-selection";
import {AudioPlayer} from "../utils/audio-player";
import  * as style from "./timeline.css";

export class Timeline extends React.Component<{player: AudioPlayer; resizeKoef: number}, {}> {
    render() {
        return <div className={style.timeline} ref="timeline">
            <AudioSelection pxPerSec={100 / this.props.resizeKoef} player={this.props.player}/>
        </div>
    }
}
