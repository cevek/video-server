import * as React from "react";
import {AudioSelection} from "./audio-selection";
import {config} from "../../../backend/config";
import {AudioPlayer} from "../utils/audio-player";
import {PostModel} from "../models/post";
import "./timeline.css";

export class Timeline extends React.Component<{postModel: PostModel; player: AudioPlayer; resizeKoef: number}, {}> {
    timeToY(time:number) {
        return time * 100 / this.props.resizeKoef;
    }

    componentDidMount() {
        this.props.player.applySpectrogramToCanvas(React.findDOMNode(this.refs['spectrogram']) as HTMLCanvasElement);
    }

    render() {
        const durationY = this.timeToY(this.props.player.duration);
        return <div className="timeline" ref="timeline">
            <canvas className="spectrogram" ref="spectrogram" style={{height: durationY}}/>
            <AudioSelection pxPerSec={100 / this.props.resizeKoef} player={this.props.player}/>
        </div>
    }
}
