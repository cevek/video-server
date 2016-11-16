import * as React from "react";
import * as classNames from "classnames";
import {PlayingStatus} from "sound-utils/dist/Play";
import {PostModel} from "../models/post";
import {AudioPlayer} from "../utils/audio-player";
import "./subtitles.scss";
import {TextLine} from "../models/TextLine";
import {DisposerItem} from "../utils/time-allocate";

export class Subtitles extends React.Component<{postModel: PostModel; player: AudioPlayer; resizeKoef: number; renderLines: DisposerItem[]}, {}> {
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
                for (var i = 0; i < this.props.postModel.enLines.length; i++) {
                    var en = this.props.postModel.enLines.get(i);
                    if (this.isSelected(en)){
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

    isSelected(textLine:TextLine) {
        const currentTime = this.props.player.currentTime;
        return ((textLine.start) / 100) <= currentTime && currentTime <= (textLine.start + textLine.dur) / 100
    }



    render() {
        const durationY = this.timeToY(this.duration);
        return <div className="subtitles">
            {this.props.postModel.enLines.map((en, i) => {
                const ru = this.props.postModel.ruLines.get(i);
                return <div
                    className={classNames('subtitles__line', {['subtitles__playing']: this.playingLine == i, ['subtitles__selected']: this.isSelected(en)})}
                    onMouseDown={()=>this.showRuTextLine(i)}
                    onMouseUp={()=>this.hideRuTextLine(i)}
                    style={{top: this.props.renderLines[i]}}>
                    <div className="subtitles__en">{en ? en.text : ''}</div>
                    {this.openedRuTextLines[i] ?
                        <div className="subtitles__ru">{ru ? ru.text : ''}</div> : null}
                </div>;
            })}
        </div>
    }
}
