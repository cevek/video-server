import * as React from "react";
import {AudioPlayer} from "../utils/AudioPlayer";
import "./audio-selection.scss";
import {autowatch} from "atom-next";
import {AudioSelectionData} from "../AudioSelectionModel";

@autowatch
export class AudioSelection extends React.Component<{audioSelectionModel: AudioSelectionData; pxPerSec: number; player: AudioPlayer},{}> {
    selecting = false;
    currentTime:HTMLElement;
    el:HTMLElement;

    offsetTop = 0;
    startY = 0;
    endY = 0;
    audioRate = 1;

    pxToTime(px:number) {
        return px / this.props.pxPerSec;
    }

    timeToPx(time:number) {
        return this.props.pxPerSec * time;
    }

    setAudioSelection() {
        const audioSelection = this.props.audioSelectionModel;

        const startTime = this.pxToTime(this.startY);
        const endTime = this.pxToTime(this.endY);
        if (endTime <= startTime) {
            audioSelection.start = endTime;
            audioSelection.end = startTime;
        }
        else {
            audioSelection.start = startTime;
            audioSelection.end = endTime;
        }
    }

    selectStart(e:MouseEvent) {
        e.preventDefault();
        this.selecting = true;
        this.startY = (e.pageY - this.offsetTop);
        this.endY = this.startY;
        this.setAudioSelection();
        this.stop();
    }

    selectMove(e:MouseEvent) {
        if (this.selecting) {
            this.endY = (e.pageY - this.offsetTop);
            this.setAudioSelection();
        }
    }

    selectEnd(e:MouseEvent) {
        if (this.selecting) {
            this.selecting = false;
            this.play();
        }
    }

    play() {
        const audioSelection = this.props.audioSelectionModel;
        this.props.player.play(audioSelection.start, audioSelection.end - audioSelection.start);
    }

    stop() {
        this.props.player.stop();
    }

    componentDidMount() {
        this.el = this.refs['audioSelection'] as HTMLElement;
        const root = this.refs['root'] as HTMLElement;
        this.currentTime = this.refs['currentTime'] as HTMLElement;
        this.offsetTop = (this.el.parentNode as HTMLElement).offsetTop;

        root.addEventListener('mousedown', e => this.selectStart(e));
        document.addEventListener('mousemove', e => this.selectMove(e));
        document.addEventListener('mouseup', e => this.selectEnd(e));

        const spectrogram = this.refs['spectrogram'] as HTMLImageElement
        const canvas = document.createElement('canvas');
        this.props.player.applySpectrogramToCanvas(canvas);
        spectrogram.src = canvas.toDataURL();
        // document.body.appendChild(canvas);
    }

    render() {
        const audioSelection = this.props.audioSelectionModel;
        const durationY = this.timeToPx(this.props.player.duration);
        const currentTimePx = this.timeToPx(this.props.player.currentTime);
        return <div className="audio-selection__wrapper" ref="root" style={{height: this.timeToPx(this.props.player.duration)}}>
            <div className="audio-selection" ref="audioSelection"
                 style={{top: this.timeToPx(audioSelection.start), height: this.timeToPx(audioSelection.end - audioSelection.start)}}></div>
            <img className="audio-selection__spectrogram" ref="spectrogram" style={{height: durationY}}/>
            <div className="audio-selection__current-time" style={{transform: `translateY(${currentTimePx}px)`}} ref="currentTime"></div>
        </div>
    }
}