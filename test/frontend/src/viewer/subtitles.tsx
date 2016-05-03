import * as React from "react";
import * as classNames from "classnames";
import {PlayingStatus} from "sound-utils/Play";
import {ITextLine} from "../../../interfaces/text-line";
import {PostModel} from "../models/post";
import {AudioPlayer} from "../utils/audio-player";
import {locals} from "./subtitles.css";

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
            if (this.props.player.player.getState() == PlayingStatus.PLAYING) {
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

    isSelected(textLine:ITextLine) {
        const currentTime = this.props.player.player.getCurrentTime();
        return ((textLine.start) / 100) <= currentTime && currentTime <= (textLine.start + textLine.dur) / 100
    }



    render() {
        const durationY = this.timeToY(this.duration);
        return <div className={locals.subtitles}>
            {this.props.postModel.lines.map((line, i) =>
                <div
                    className={classNames(locals.line, {[locals.playing]: this.playingLine == i, [locals.selected]: this.isSelected(line.en)})}
                    onMouseDown={()=>this.showRuTextLine(i)}
                    onMouseUp={()=>this.hideRuTextLine(i)}
                    style={{top: this.props.renderLines[i]}}>
                    <div className={locals.en}>{line.en ? line.en.text : ''}</div>
                    {this.openedRuTextLines[i] ?
                        <div className={locals.ru}>{line.ru ? line.ru.text : ''}</div> : null}
                </div>)}
        </div>
    }
}
