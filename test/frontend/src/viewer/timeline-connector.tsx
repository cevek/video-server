import * as React from "react";
import {svgPathGenerator} from "../utils/svg-path-generator";
import {ITextLine} from "../../../interfaces/text-line";
import {PostModel} from "../models/post";
import {AudioPlayer} from "../utils/audio-player";
import {EditorHistory} from "../utils/history";
import "./timeline-connector.css";


export const EditorHistoryTimelineType = 'timeline';
export interface EditorHistoryTimeline {
    type: string;
    id: string;
    oldStart: number;
    oldDur: number;
    newStart: number;
    newDur: number;
}


interface TimelineConnectorProps {
    postModel: PostModel;
    player: AudioPlayer;
    resizeKoef: number;
    lineH: number;
    renderLines:number[];
    history: EditorHistory;
}
export class TimelineConnector extends React.Component<TimelineConnectorProps, {}> {
    timeToY(time:number) {
        return time * 100 / this.props.resizeKoef;
    }

    playTextLine(textLine:ITextLine) {
        //todo: audioselection
        this.props.player.player.play(textLine.start / 100, textLine.dur / 100, false, ()=> {
            console.log("EEEEnd");
        });
    }

    activeTextLine = -1;
    activeTextLineStart = 0;
    activeTextLineDur = 0;
    activeIsTop = false;
    y = 0;

    moveResizeKoef = 1 / 2;

    onMouseDown(e:MouseEvent, textLineN:number, isTop:boolean) {
        const textLine = this.props.postModel.lines[textLineN].en;
        this.activeIsTop = isTop;
        this.activeTextLine = textLineN;
        this.activeTextLineStart = textLine.start;
        this.activeTextLineDur = textLine.dur;
        this.y = e.pageY;
        e.preventDefault();
        document.body.classList.add('resizing');
    }

    historyListen = (data:EditorHistoryTimeline, isRedo:boolean) => {
        if (data.type == EditorHistoryTimelineType) {
            const textLine = this.props.postModel.data.textLines[data.id];
            textLine.start = isRedo ? data.newStart : data.oldStart;
            textLine.dur = isRedo ? data.newDur : data.oldDur;
            this.forceUpdate();
        }
    }

    componentDidMount() {
        this.props.history.listen(this.historyListen);
        document.addEventListener("mousemove", e => {
            if (this.activeTextLine > -1) {
                const textLine = this.props.postModel.lines[this.activeTextLine].en;
                // console.log((this.y - e.offsetY));
                let diff = (this.y - e.pageY) * this.props.resizeKoef * this.moveResizeKoef;
                const minH = 20 * this.props.resizeKoef;
                if (this.activeIsTop) {
                    if (this.activeTextLineStart - diff < 0) {
                        diff = this.activeTextLineStart;
                    }
                    if (this.activeTextLineDur + diff < minH) {
                        diff = -(this.activeTextLineDur - minH);
                    }
                    textLine.start = this.activeTextLineStart - diff;
                    textLine.dur = this.activeTextLineDur + diff;
                } else {
                    textLine.dur = this.activeTextLineDur - diff > minH ? this.activeTextLineDur - diff : minH;
                }
                this.forceUpdate();
            }
        })
        document.addEventListener("mouseup", e => {
            if (this.activeTextLine > -1) {
                const textLine = this.props.postModel.lines[this.activeTextLine].en;
                this.playTextLine(textLine);
                this.activeTextLine = -1;
                document.body.classList.remove('resizing');
                if (this.activeTextLineStart != textLine.start || this.activeTextLineDur != textLine.dur) {
                    this.props.history.add({
                        id: textLine.id,
                        type: EditorHistoryTimelineType,
                        oldStart: this.activeTextLineStart,
                        oldDur: this.activeTextLineDur,
                        newStart: textLine.start,
                        newDur: textLine.dur,
                    } as EditorHistoryTimeline);
                }
                this.forceUpdate();
            }
        })
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
                return <g className={i == this.activeTextLine ? 'resizing' : ''}>
                    <path onClick={()=>this.playTextLine(textLine)} fill={color}
                          d={svgPathGenerator(tl, bl, tr, br, connectorWidth)}/>
                    <rect onMouseDown={(e:any)=>this.onMouseDown(e, i, true)} className="top" y={tl}/>
                    <rect onMouseDown={(e:any)=>this.onMouseDown(e, i, false)} className="bottom" y={bl-20}/>
                </g>
            })}
        </svg>

    }
}
