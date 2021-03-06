import * as React from "react";
import {svgPathGenerator} from "../utils/svg-path-generator";
import {EditorHistoryData} from "../utils/history";
import {autowatch, prop} from "atom-next";
import {classes} from "../utils/cl";
import {Lang} from "../models/Lang";
import {TextLine} from "../models/TextLine";
import {EditorModel} from "../models/Editor/EditorModel";
import './timeline-connector.scss'



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
    model: EditorModel;
}

@autowatch
export class TimelineConnector extends React.Component<TimelineConnectorProps, {}> {
    model = this.props.model;
    playTextLine(textLine:TextLine) {
        const start = textLine.start / 100;
        const dur = textLine.dur / 100;
        this.model.player.play(start, dur);
        this.model.audioSelection.start = start;
        this.model.audioSelection.end = start + dur;
    }

    @prop activeLine = -1;
    @prop activeLineStart = 0;
    @prop activeLineDur = 0;
    @prop activeIsTop = false;
    y = 0;

    moveResizeKoef = 1 / 2;

    onMouseDown(e:MouseEvent, lineN:number, isTop:boolean) {
        const textLine = this.model.post.lines[lineN].en;
        this.activeIsTop = isTop;
        this.activeLine = lineN;
        this.activeLineStart = textLine.start;
        this.activeLineDur = textLine.dur;
        this.y = e.pageY;
        e.preventDefault();
        document.body.classList.add('body__resizing');
    }

    historyListen = (data:HistoryTimeline, isRedo:boolean) => {
        const textLine = this.model.post.lines[data.lineN].en;
        textLine.start = isRedo ? data.newStart : data.oldStart;
        textLine.dur = isRedo ? data.newDur : data.oldDur;
        this.forceUpdate();
    };

    componentDidMount() {
        // this.props.history.listen(HistoryTimeline.type, this.historyListen);
        document.addEventListener("mousemove", e => {
            if (this.activeLine > -1) {
                const textLine = this.model.post.lines[this.activeLine].en;
                // console.log((this.y - e.offsetY));
                let diff = this.model.lineCalc.pxToTime(this.y - e.pageY) * this.moveResizeKoef;
                const minH = this.model.lineCalc.pxToTime(20);
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
        });
        document.addEventListener("mouseup", e => {
            if (this.activeLine > -1) {
                const textLine = this.model.post.lines[this.activeLine].en;
                this.playTextLine(textLine);
                document.body.classList.remove('body--resizing');
                if (this.activeLineStart != textLine.start || this.activeLineDur != textLine.dur) {
                    /*this.props.history.add(new HistoryTimeline({
                        lineN: this.activeLine,
                        lang: Lang.EN,
                        type: HistoryTimeline.type,
                        oldStart: this.activeLineStart,
                        oldDur: this.activeLineDur,
                        newStart: textLine.start,
                        newDur: textLine.dur,
                    }));*/
                }
                this.activeLine = -1;
            }
        })
    }

    render() {
        const connectorWidth = 50;
        const svgWidth = connectorWidth;
        //todo:
        const last = this.model.renderLines[this.model.renderLines.length - 1];
        const svgHeight = Math.max(last.realBottom, last.bottom);//this.model.lineCalc.timeToPx(this.model.videoPlayer.duration);

        return <svg className="timeline-connector" width={svgWidth} height={svgHeight}>
            {this.model.renderLines.map((pos, i) => {
                const textLine = this.model.post.lines[i].en;
                if (textLine.start != null) {
                    const tl = pos.realTop;
                    const bl = pos.realBottom;
                    const tr = pos.top;
                    const br = pos.bottom;
                    const color = 'hsla(' + (textLine.start) + ', 50%,60%, 1)';
                    return <g key={i} className={classes("timeline-connector__resizing", i == this.activeLine)}>
                        <path onClick={()=>this.playTextLine(textLine)} fill={color}
                              d={svgPathGenerator(tl, bl, tr, br, connectorWidth)}/>
                        <rect onMouseDown={(e:any)=>this.onMouseDown(e, i, true)} className="timeline-connector__top" y={tl}/>
                        <rect onMouseDown={(e:any)=>this.onMouseDown(e, i, false)} className="timeline-connector__bottom" y={bl-20}/>
                    </g>
                }
                return null;
            })}
        </svg>

    }
}
