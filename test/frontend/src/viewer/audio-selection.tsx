import * as React from "react";
import {AudioPlayer} from "../utils/audio-player";
import * as style from "./audio-selection.css";

export class AudioSelectionData {
    start = 0;
    end = 0;
}

var audioSelection = new AudioSelectionData();
function setAudioSelection(start:number, end:number) {
    audioSelection.start = start;
    audioSelection.end = end;
}


export class AudioSelection extends React.Component<{pxPerSec: number; player: AudioPlayer},{}> {
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
        const startTime = this.pxToTime(this.startY);
        const endTime = this.pxToTime(this.endY);
        if (endTime <= startTime) {
            setAudioSelection(endTime, startTime);
        }
        else {
            setAudioSelection(startTime, endTime);
        }
        this.forceUpdate();
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
            this.forceUpdate();
        }
    }

    play() {
        this.startCurrentTime();
        this.props.player.player.play(audioSelection.start, audioSelection.end - audioSelection.start);
        console.log('play', audioSelection.start, audioSelection.end - audioSelection.start);

    }

    stop() {
        this.stopCurrentTime();
        this.props.player.player.stop();
    }

    startCurrentTime() {
        var dur = (audioSelection.end - audioSelection.start);
        this.currentTime.style.transition = '';
        this.currentTime.style.transform = `translateY(${this.timeToPx(audioSelection.start)}px)`;
        //noinspection BadExpressionStatementJS
        this.currentTime.offsetHeight; //force reflow
        this.currentTime.style.transition = 'all linear';
        this.currentTime.style.transform = `translateY(${this.timeToPx(audioSelection.end)}px)`;
        this.currentTime.style.transitionDuration = dur / this.audioRate + 's';
    }

    stopCurrentTime() {
        this.currentTime.style.transition = '';
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
        const durationY = this.timeToPx(this.props.player.duration);
        return <div className={style.audioSelectionWrapper} ref="root" style={{height: this.timeToPx(this.props.player.duration)}}>
            <img className={style.spectrogram} ref="spectrogram" style={{height: durationY}}/>
            <div className={style.audioSelection} ref="audioSelection"
                 style={{top: this.timeToPx(audioSelection.start), height: this.timeToPx(audioSelection.end - audioSelection.start)}}></div>
            <div className={style.currentTime} ref="currentTime"></div>
        </div>
    }
}