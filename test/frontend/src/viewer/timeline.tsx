import * as React from "react";
import {AudioSelection} from "./audio-selection";
import {AudioPlayer} from "../utils/audio-player";
import "./timeline.css";

export class Timeline extends React.Component<{player: AudioPlayer; resizeKoef: number}, {}> {
    timeToY(time:number) {
        return time * 100 / this.props.resizeKoef;
    }

    componentDidMount() {
        this.props.player.applySpectrogramToCanvas(this.refs['spectrogram'] as HTMLCanvasElement);
    }

    render() {
        const durationY = this.timeToY(this.props.player.duration);
        return <div className="timeline" ref="timeline">
            <canvas className="spectrogram" ref="spectrogram" style={{height: durationY}}/>
            <AudioSelection pxPerSec={100 / this.props.resizeKoef} player={this.props.player}/>
        </div>
    }
}
