import * as React from "react";
import * as classNames from "classnames";
import {PlayingStatus} from "sound-utils/Play";
import {PostModel} from "../models/post";
import {AudioPlayer} from "../utils/audio-player";
import * as style from "./subtitles.css";
import {ITextLines} from "../models/DBModels";

export class Subtitles extends React.Component<{postModel: PostModel; player: AudioPlayer; resizeKoef: number; renderLines: number[]}, {}> {
    duration:number = 0;
   
    timeToY(time:number) {
        return time * 100 / this.props.resizeKoef;
    }

    showRuTextLine(i:number) {
        this.openedRuTextLines[i] = true;
        this.forceUpdate();
    }

    hideRuTextLine(i:number) {
        this.openedRuTextLines[i] = false;
        this.forceUpdate();
    }

    openedRuTextLines:boolean[] = [];

    componentDidMount(){
        setInterval(()=> {
            let playingLine = -1;
            if (this.props.player.state == PlayingStatus.PLAYING) {
                for (var i = 0; i < this.props.postModel.lines.length; i++) {
                    var line = this.props.postModel.lines[i];
                    if (this.isSelected(line.en)){
                        playingLine = i;
                        break;
                    }
                }
            }
            if (this.playingLine !== playingLine) {
                this.playingLine = playingLine;
                this.forceUpdate();
            }
        }, 10);
    }
    playingLine = -1;

    isSelected(textLine:ITextLines) {
        const currentTime = this.props.player.currentTime;
        return ((textLine.start) / 100) <= currentTime && currentTime <= (textLine.start + textLine.dur) / 100
    }



    render() {
        const durationY = this.timeToY(this.duration);
        return <div className={style.subtitles}>
            {this.props.postModel.lines.map((line, i) =>
                <div
                    className={classNames(style.line, {[style.playing]: this.playingLine == i, [style.selected]: this.isSelected(line.en)})}
                    onMouseDown={()=>this.showRuTextLine(i)}
                    onMouseUp={()=>this.hideRuTextLine(i)}
                    style={{top: this.props.renderLines[i]}}>
                    <div className={style.en}>{line.en ? line.en.text : ''}</div>
                    {this.openedRuTextLines[i] ?
                        <div className={style.ru}>{line.ru ? line.ru.text : ''}</div> : null}
                </div>)}
        </div>
    }
}
