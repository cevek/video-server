import * as React from "react";
import {svgPathGenerator} from "../utils/svg-path-generator";
import {ITextLine} from "../../../interfaces/text-line";
import {AudioPlayer} from "../utils/audio-player";
import {EditorHistory, EditorHistoryData} from "../utils/history";
import {Line} from "../models/line";
import {Lang} from "../../../interfaces/lang";
import * as style from "./timeline-connector.css";
import {autowatch} from "../../atom-next/autowatch";
import {AudioSelectionData} from "../audio-selection-model";


export class HistoryTimeline extends EditorHistoryData<HistoryTimeline> {
    static type = 'timeline';
    lineN:number;
    lang:Lang;
    oldStart:number;
    oldDur:number;
    newStart:number;
    newDur:number;
}


interface TimelineConnectorProps {
    lines:Line[];
    player:AudioPlayer;
    resizeKoef:number;
    lineH:number;
    renderLines:number[];
    history:EditorHistory;
    audioSelectionModel: AudioSelectionData;
}

@autowatch
export class TimelineConnector extends React.Component<TimelineConnectorProps, {}> {
    timeToY(time:number) {
        return time * 100 / this.props.resizeKoef;
    }

    playTextLine(textLine:ITextLine) {
        const start = textLine.start / 100;
        const dur = textLine.dur / 100;
        this.props.player.play(start, dur);
        this.props.audioSelectionModel.start = start;
        this.props.audioSelectionModel.end = start + dur;
    }

    activeLine = -1;
    activeLineStart = 0;
    activeLineDur = 0;
    activeIsTop = false;
    y = 0;

    moveResizeKoef = 1 / 2;

    onMouseDown(e:MouseEvent, lineN:number, isTop:boolean) {
        const textLine = this.props.lines[lineN].en;
        this.activeIsTop = isTop;
        this.activeLine = lineN;
        this.activeLineStart = textLine.start;
        this.activeLineDur = textLine.dur;
        this.y = e.pageY;
        e.preventDefault();
        document.body.classList.add(style.resizing);
    }

    historyListen = (data:HistoryTimeline, isRedo:boolean) => {
        const textLine = this.props.lines[data.lineN].en;
        textLine.start = isRedo ? data.newStart : data.oldStart;
        textLine.dur = isRedo ? data.newDur : data.oldDur;
        this.forceUpdate();
    }

    componentDidMount() {
        this.props.history.listen(HistoryTimeline.type, this.historyListen);
        document.addEventListener("mousemove", e => {
            if (this.activeLine > -1) {
                const textLine = this.props.lines[this.activeLine].en;
                // console.log((this.y - e.offsetY));
                let diff = (this.y - e.pageY) * this.props.resizeKoef * this.moveResizeKoef;
                const minH = 20 * this.props.resizeKoef;
                if (this.activeIsTop) {
                    if (this.activeLineStart - diff < 0) {
                        diff = this.activeLineStart;
                    }
                    if (this.activeLineDur + diff < minH) {
                        diff = -(this.activeLineDur - minH);
                    }
                    textLine.start = this.activeLineStart - diff;
                    textLine.dur = this.activeLineDur + diff;
                } else {
                    textLine.dur = this.activeLineDur - diff > minH ? this.activeLineDur - diff : minH;
                }
            }
        })
        document.addEventListener("mouseup", e => {
            if (this.activeLine > -1) {
                const textLine = this.props.lines[this.activeLine].en;
                this.playTextLine(textLine);
                document.body.classList.remove(style.resizing);
                if (this.activeLineStart != textLine.start || this.activeLineDur != textLine.dur) {
                    this.props.history.add(new HistoryTimeline({
                        lineN: this.activeLine,
                        lang: Lang.EN,
                        type: HistoryTimeline.type,
                        oldStart: this.activeLineStart,
                        oldDur: this.activeLineDur,
                        newStart: textLine.start,
                        newDur: textLine.dur,
                    }));
                }
                this.activeLine = -1;
            }
        })
    }

    render() {
        const connectorWidth = 50;
        const svgWidth = connectorWidth;
        const svgHeight = this.timeToY(this.props.player.duration);
        const lineH = this.props.lineH;
        const halfLineH = lineH / 2;
        const resizeKoef = this.props.resizeKoef;

        return <svg className={style.timelineConnector} width={svgWidth} height={svgHeight}>
            {this.props.renderLines.map((pos, i) => {
                const textLine = this.props.lines[i].en;
                if (textLine) {
                    const tl = textLine.start / resizeKoef;
                    const bl = (textLine.start + textLine.dur) / resizeKoef;
                    const tr = pos - halfLineH;
                    const br = pos + halfLineH;
                    const color = 'hsla(' + (textLine.start) + ', 50%,60%, 1)';
                    return <g key={i} className={i == this.activeLine ? style.resizing : ''}>
                        <path onClick={()=>this.playTextLine(textLine)} fill={color}
                              d={svgPathGenerator(tl, bl, tr, br, connectorWidth)}/>
                        <rect onMouseDown={(e:any)=>this.onMouseDown(e, i, true)} className={style.top} y={tl}/>
                        <rect onMouseDown={(e:any)=>this.onMouseDown(e, i, false)} className={style.bottom} y={bl-20}/>
                    </g>
                }
                return null;
            })}
        </svg>

    }
}
