import './viewer.css';
import * as React from 'react';
import * as classNames from 'classnames';

import {PostModel} from "./../models/post";
import {ILine} from "../../../interfaces/line";
import {IGetPost} from "../../../interfaces/transport";
import {Subtitles} from "./subtitles";
import {LineAllocator} from "../utils/time-allocate";
import {svgPathGenerator} from "../utils/svg-path-generator";
import {ITextLine} from "../../../interfaces/text-line";
import {AudioSelection} from "./audio-selection";

import {FFT} from "sound-utils/FFT";
import {SoundLoader} from "sound-utils/SoundLoader";
import {Play, PlayingStatus} from "sound-utils/Play";
import {Spectrogram} from "sound-utils/Spectrogram";
import {config} from "../../../backend/config";

var audioContext = new AudioContext();
export class Viewer extends React.Component<{params: any, resolved: PostModel}, {}> {
    currentTime:number = 0;
    duration:number = 0;
    videoWrapper:Element;
    ytReady = false;
    isStarted = false;
    isEnded = false;
    isPlaying = false;
    player = new Play(audioContext);
    videoPlayer:any;
    soundLoaded = false;
    spectrogram = new Spectrogram(256);

    static load(params:any) {
        return PostModel.fetch(params.id);
    }

    c1omponentDidMount() {
        var data = this.props.resolved.data;
        var videoId = data.mediaFiles[data.post.video].url.split('=').pop();
        var div = document.createElement('div');
        div.id = Math.random().toString();
        this.videoWrapper.appendChild(div);
        YTReady.then(() => {
            this.videoPlayer = new YT.Player(div.id, {
                height: '640',
                width: '390',
                videoId: videoId,
                playerVars: {'a1utoplay': 1, 'controls': 0, iv_load_policy: 3, modestbranding: 1, rel: 0, showinfo: 0},
                events: {
                    'onReady': (event:any) => {
                        //event.target.playVideo();
                        this.duration = this.videoPlayer.getDuration();
                        this.ytReady = true;
                        this.forceUpdate();
                        setInterval(() => {
                            this.currentTime = this.videoPlayer.getCurrentTime();
                            console.log(this.currentTime);
                            this.forceUpdate();
                        }, 100);
                    },
                    'onStateChange': (event:any) => {
                        this.isPlaying = false;
                        if (event.data == YT.PlayerState.ENDED) {
                            this.isEnded = true;
                        }
                        if (event.data == YT.PlayerState.PLAYING) {
                            this.isStarted = true;
                            this.isPlaying = true;
                        }
                        this.forceUpdate();
                    }
                }
            });
        });
    }

    spectrogramData:Uint8ClampedArray[];
    audioBuffer:AudioBuffer;

    loadSound() {
        var data = this.props.resolved.data;
        const enAudio = data.mediaFiles[data.post.enAudio];
        const url = config.baseUrl + '/' + enAudio.url;
        new SoundLoader(audioContext).fromUrl(url).then(audioBuffer => {
            this.audioBuffer = audioBuffer;
            this.duration = audioBuffer.duration;
            this.player.setAudio(audioBuffer);
            this.spectrogramData = this.process(audioBuffer, 128);
            // this.spectrogram.process(audioBuffer);
            this.loadSpectrogram();
            this.soundLoaded = true;
            this.forceUpdate();
        });
        //todo: wtf
        setInterval(()=> {
            const currentTime = this.player.getCurrentTime();
            let playingLine = -1;
            if (this.player.getState() == PlayingStatus.PLAYING) {
                for (var i = 0; i < this.lines.length; i++) {
                    var line = this.lines[i];
                    if (line.en.start / 100 <= currentTime && (line.en.start + line.en.dur) / 100 >= currentTime) {
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


    loadSpectrogram() {
        const data = this.spectrogramData;
        const canvas = React.findDOMNode(this.refs['spectrogram']) as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');


        var timeLen = data.length;
        var valsLen = data[0].length;
        canvas.width = valsLen;
        canvas.height = timeLen;

        var imd = new ImageData(valsLen, timeLen);
        var imdd = imd.data;
        for (var i = 0; i < timeLen; i++) {
            var vals = data[i];
            for (var j = 0; j < valsLen; j++) {
                var val = 255 - vals[j] * 5;
                var pos = (i * valsLen + valsLen - j) * 4;
                imdd[pos + 0] = val;
                imdd[pos + 1] = val;
                imdd[pos + 2] = val;
                imdd[pos + 3] = 255;
            }
        }
        ctx.putImageData(imd, 0, 0);
        return imd;
    }

    process(audioBuffer:AudioBuffer, fftSize:number) {
        const data:Uint8ClampedArray[] = [];
        const koef = 30;
        var bufferSize = fftSize;
        var bufferDataSize = fftSize * koef;
        var fft = new FFT(bufferSize, 0);
        var signal:Float32Array = audioBuffer.getChannelData(0);
        var bufferSignal = new Float32Array(bufferSize);
        var k = 0;
        while (signal.length > k + bufferDataSize) {
            const bb = signal.subarray(k, k + bufferDataSize);
            const kk = new Float32Array(bufferSize);
            for (var i = 0; i < bb.length; i += koef) {
                kk[i / koef | 0] = bb[i];
            }
            bufferSignal.set(kk);
            k += bufferDataSize;
            fft.forward(bufferSignal);
            var spectrum = fft.spectrum;
            var arr = new Uint8ClampedArray(spectrum.length);
            for (var j = 0; j < spectrum.length; j++) {
                // equalize, attenuates low freqs and boosts highs
                //arr[j] = spectrum[j] * -1 * Math.log((bufferSize / 2 - j) * (0.5 / bufferSize / 2)) * bufferSize | 0;
                arr[j] = spectrum[j] * 5000;
            }
            data.push(arr);
        }
        return data;
    }

    componentDidMount() {
        this.loadSound();
    }

    isSelected(textLine:ITextLine) {
        return ((textLine.start) / 100) <= this.currentTime && this.currentTime <= (textLine.start + textLine.dur) / 100
    }

    resizeKoef = 4;

    timeToY(time:number) {
        return time * 100 / this.resizeKoef;
    }

    playTextLine(textLine:ITextLine) {
        //todo: audioselection
        this.player.play(textLine.start / 100, textLine.dur / 100, false, ()=> {
            console.log("EEEEnd");
        });
    }

    openedRuTextLines:boolean[] = [];

    showRuTextLine(i:number) {
        this.openedRuTextLines[i] = true;
        this.forceUpdate();
    }

    hideRuTextLine(i:number) {
        this.openedRuTextLines[i] = false;
        this.forceUpdate();
    }

    lines = this.props.resolved.data.lines.filter(line => Boolean(this.props.resolved.data.textLines[line.en])).map(line => {
        return {
            en: this.props.resolved.data.textLines[line.en],
            ru: this.props.resolved.data.textLines[line.ru],
        }
    });

    render() {
        // console.log(this.currentTime, this.duration);
        var data = this.props.resolved.data;
        const lines = this.lines;

        const resizeKoef = this.resizeKoef;
        const lineH = 50;
        const connectorWidth = 50;
        const halfLineH = lineH / 2;

        const durationY = this.timeToY(this.duration);

        const positions = lines.map(line => (line.en.start + line.en.dur / 2) / resizeKoef);
        const renderLines = new LineAllocator(positions, 50).allocateRenderLines();
        const svgWidth = 100;
        const svgHeight = durationY;
        console.log(durationY);

        const video = data.mediaFiles[data.post.video];
        const enAudio = data.mediaFiles[data.post.enAudio];
        const shiftVideoY = this.timeToY(video.shiftTime);
        const shiftAudioY = this.timeToY(enAudio.shiftTime);

        const thumbImg = config.baseUrl + '/' + data.mediaFiles[data.post.thumbs].url;
        const thumbWidth = 200;
        const thumbHeight = 100;
        const thumbsPerLine = 20;
        const thumbShift = -thumbHeight / 2;
        const thumbsCount = durationY / thumbHeight | 0;
        const thumbsItems:{top:number;imgTop:number;imgLeft:number}[] = [];
        for (var i = 0; i < thumbsCount; i++) {
            const k = Math.round(i * thumbHeight / durationY * this.duration);
            thumbsItems.push({
                top: i * thumbHeight + thumbShift,
                imgTop: (k / thumbsPerLine | 0) * thumbHeight,
                imgLeft: (k % thumbsPerLine) * thumbWidth,
            })
        }
        return <div>
            {this.currentTime}
            <div className="timeline" ref="timeline">
                <canvas className="spectrogram" ref="spectrogram" style={{top: shiftAudioY, height: durationY}}/>
                <svg className="timeline-connector" width={svgWidth} height={svgHeight} style={{top: shiftAudioY}}>
                    {renderLines.map((pos, i) => {
                        const textLine = lines[i].en;
                        const tl = textLine.start / resizeKoef;
                        const bl = (textLine.start + textLine.dur) / resizeKoef;
                        const tr = pos - halfLineH;
                        const br = pos + halfLineH;
                        const color = 'hsla(' + (textLine.start) + ', 50%,60%, 1)';
                        return <path onClick={()=>this.playTextLine(textLine)} fill={color}
                            d={svgPathGenerator(tl, bl, tr, br, connectorWidth)}/>
                    })}
                </svg>
                <AudioSelection shift={shiftAudioY} pxPerSec={100 / resizeKoef} player={this.player} duration={this.duration}/>
                </div>
            <div className="thumbs" style={{top: shiftVideoY}}>
                {thumbsItems.map(thumb =>
                    <div className="thumb"
                        style={{top: thumb.top, background: `url(${thumbImg}) ${-thumb.imgLeft}px ${-thumb.imgTop}px`}}>
                    </div>)}
                </div>
            <div ref={d => this.videoWrapper = React.findDOMNode(d)} className="video">
                <div className="overlay"></div>
                {!this.isStarted || this.isEnded ?
                    <div className="cover"></div>: null}
                </div>
            {this.ytReady ?
                <div className="controls">
                    {this.isPlaying ?
                        <button onClick={()=>this.videoPlayer.pauseVideo()}>Stop</button>
                        :
                        <button onClick={()=>this.videoPlayer.playVideo()}>Play</button>
                    }
                </div> : null}
            <div>
                <meter value={this.currentTime + ''} max={this.duration + ''}/>
                </div>
            <div className="subtitles" style={{top: shiftAudioY}}>
                {lines.map((line, i) =>
                    <div className={classNames("line", {playing: this.playingLine == i, selected: this.isSelected(line.en)})}
                        onMouseDown={()=>this.showRuTextLine(i)}
                        onMouseUp={()=>this.hideRuTextLine(i)}
                        style={{top: renderLines[i]}}>
                        <div className="en">{line.en ? line.en.text : ''}</div>
                        {this.openedRuTextLines[i] ?
                            <div className="ru">{line.ru ? line.ru.text : ''}</div> : null}
                    </div>)}
                </div>
        </div>
    }
}
