import * as React from "react";
import {PostModel} from "../models/post";
import "./thumbs.scss";
import {classes} from "../utils/cl";
import {autowatch} from "atom-next";
import {EditorModel} from "../models/Editor/EditorModel";
import {config} from "../config";


interface IThumb {
    top:number;
    imgTop:number;
    imgLeft:number;
    k:number
}

@autowatch
export class Thumbs extends React.Component<{postModel:PostModel; model: EditorModel, resizeKoef:number;}, {}> {
    timeToY(time:number) {
        return time * 100 / this.props.resizeKoef;
    }

    onClick(thumb: IThumb) {
        //todo: need rethink
        if (this.props.model) {
            this.props.model.post.cover = thumb.k;
        }
    }

    render() {
        const postModel = this.props.postModel;

        const video = postModel.mediaFiles.getOrThrow(postModel.post.video);
        const enAudio = postModel.mediaFiles.getOrThrow(postModel.post.enAudio);
        const shiftVideoY = this.timeToY(video.shiftTime);
        const shiftAudioY = this.timeToY(enAudio.shiftTime);
        const durationY = this.timeToY(enAudio.duration);

        const thumbImg = config.baseUrl + '/' + postModel.mediaFiles.getOrThrow(postModel.post.thumbs).url;
        const thumbWidth = 400;
        const thumbHeight = 200;
        const thumbsPerLine = 20;
        const thumbShift = -thumbHeight / 2;
        const thumbCountPerSecond = 1 / 8;
        const thumbsCount = durationY / thumbHeight | 0;
        const thumbsItems:IThumb[] = [];
        var thumbK = thumbHeight / durationY * enAudio.duration;

        for (var i = 0; i < thumbsCount; i++) {
            const k = Math.round(i * thumbK * thumbCountPerSecond);
            thumbsItems.push({
                top: i * thumbHeight + thumbShift + shiftAudioY - shiftVideoY,
                imgTop: (k / thumbsPerLine | 0) * thumbHeight,
                imgLeft: (k % thumbsPerLine) * thumbWidth,
                k: k
            })
        }

        const model = this.props.model;
        const cover = model ? model.post.cover : -1;


        return <div className="thumbs">
            {thumbsItems.map((thumb, i) =>
                <div className={classes('thumbs__thumb', true, 'thumbs__selected', cover == thumb.k)} key={i}
                     style={{top: thumb.top, background: `url(${thumbImg}) ${-thumb.imgLeft}px ${-thumb.imgTop}px`}}
                     onClick={()=>this.onClick(thumb)}>
                </div>)}
        </div>

    }
}