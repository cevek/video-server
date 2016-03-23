import * as React from "react";
import {config} from "../../../backend/config";
import {PostModel} from "../models/post";
import "./thumbs.css";

export class Thumbs extends React.Component<{postModel: PostModel; resizeKoef: number;}, {}> {
    timeToY(time:number) {
        return time * 100 / this.props.resizeKoef;
    }

    render() {
        const data = this.props.postModel.data;

        const video = data.mediaFiles[data.post.video];
        const enAudio = data.mediaFiles[data.post.enAudio];
        const shiftVideoY = this.timeToY(video.shiftTime);
        const shiftAudioY = this.timeToY(enAudio.shiftTime);
        const durationY = this.timeToY(enAudio.duration);

        const thumbImg = config.baseUrl + '/' + data.mediaFiles[data.post.thumbs].url;
        const thumbWidth = 400;
        const thumbHeight = 200;
        const thumbsPerLine = 20;
        const thumbShift = -thumbHeight / 2;
        const thumbCountPerSecond = 1 / 8;
        const thumbsCount = durationY / thumbHeight | 0;
        const thumbsItems:{top:number;imgTop:number;imgLeft:number}[] = [];
        var thumbK = thumbHeight / durationY * enAudio.duration;

        for (var i = 0; i < thumbsCount; i++) {
            const k = Math.round(i * thumbK * thumbCountPerSecond);
            thumbsItems.push({
                top: i * thumbHeight + thumbShift + shiftAudioY - shiftVideoY,
                imgTop: (k / thumbsPerLine | 0) * thumbHeight,
                imgLeft: (k % thumbsPerLine) * thumbWidth,
            })
        }

        return <div className="thumbs">
            {thumbsItems.map(thumb =>
                <div className="thumb"
                     style={{top: thumb.top, background: `url(${thumbImg}) ${-thumb.imgLeft}px ${-thumb.imgTop}px`}}>
                </div>)}
        </div>

    }
}