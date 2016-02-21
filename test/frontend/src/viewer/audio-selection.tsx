import * as React from 'react';
import './audio-selection.css';

export class AudioSelectionData {
    start = 0;
    end = 0;
}

var audioSelection = new AudioSelectionData();
function setAudioSelection(start:number, end:number) {
    audioSelection.start = start;
    audioSelection.end = end;
}

import {Play} from "sound-utils/Play";


export class AudioSelection extends React.Component<{shift: number; pxPerSec: number; duration: number; player: Play},{}> {
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
        this.props.player.play(audioSelection.start, audioSelection.end - audioSelection.start);
        console.log('play', audioSelection.start, audioSelection.end - audioSelection.start);

    }

    stop() {
        this.stopCurrentTime();
        this.props.player.stop();
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
        this.el = React.findDOMNode(this.refs['audioSelection']) as HTMLElement;
        const root = React.findDOMNode(this.refs['root']) as HTMLElement;
        this.currentTime = React.findDOMNode(this.refs['currentTime']) as HTMLElement;
        this.offsetTop = (this.el.parentNode as HTMLElement).offsetTop;

        root.addEventListener('mousedown', e => this.selectStart(e));
        document.addEventListener('mousemove', e => this.selectMove(e));
        document.addEventListener('mouseup', e => this.selectEnd(e));
    }

    render() {
        return <div className="audio-selection-wrapper" ref="root" style={{top: this.props.shift, height: this.timeToPx(this.props.duration)}}>
            <div className="audio-selection" ref="audioSelection"
                 style={{top: this.timeToPx(audioSelection.start), height: this.timeToPx(audioSelection.end - audioSelection.start)}}></div>
            <div className="current-time" ref="currentTime"></div>
        </div>
    }
}