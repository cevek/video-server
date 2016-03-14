import * as React from "react";
import {svgPathGenerator} from "../utils/svg-path-generator";
import {ITextLine} from "../../../interfaces/text-line";
import {PostModel} from "../models/post";
import {AudioPlayer} from "../utils/audio-player";
import "./timeline-connector.css";

export class TimelineConnector extends React.Component<{postModel: PostModel; player: AudioPlayer; resizeKoef: number; lineH: number;renderLines:number[]}, {}> {
    timeToY(time:number) {
        return time * 100 / this.props.resizeKoef;
    }

    playTextLine(textLine:ITextLine) {
        //todo: audioselection
        this.props.player.player.play(textLine.start / 100, textLine.dur / 100, false, ()=> {
            console.log("EEEEnd");
        });
    }

    render() {
        const connectorWidth = 50;
        const svgWidth = 100;
        const svgHeight = this.timeToY(this.props.player.duration);
        const lineH = this.props.lineH;
        const halfLineH = lineH / 2;
        const resizeKoef = this.props.resizeKoef;


        return <svg className="timeline-connector" width={svgWidth} height={svgHeight}>
            {this.props.renderLines.map((pos, i) => {
                const textLine = this.props.postModel.lines[i].en;
                const tl = textLine.start / resizeKoef;
                const bl = (textLine.start + textLine.dur) / resizeKoef;
                const tr = pos - halfLineH;
                const br = pos + halfLineH;
                const color = 'hsla(' + (textLine.start) + ', 50%,60%, 1)';
                return <path onClick={()=>this.playTextLine(textLine)} fill={color}
                             d={svgPathGenerator(tl, bl, tr, br, connectorWidth)}/>
            })}
        </svg>

    }
}
