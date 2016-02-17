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
export class Viewer extends React.Component<{params: any, resolved: PostModel}, {}> {
    currentTime:number = 0;
    duration:number = 0;
    videoWrapper:Element;
    ytReady = false;
    isStarted = false;
    isEnded = false;
    isPlaying = false;
    player:any;

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
            this.player = new YT.Player(div.id, {
                height: '640',
                width: '390',
                videoId: videoId,
                playerVars: {'a1utoplay': 1, 'controls': 0, iv_load_policy: 3, modestbranding: 1, rel: 0, showinfo: 0},
                events: {
                    'onReady': (event:any) => {
                        //event.target.playVideo();
                        this.duration = this.player.getDuration();
                        this.ytReady = true;
                        this.forceUpdate();
                        setInterval(() => {
                            this.currentTime = this.player.getCurrentTime();
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

    isSelected(textLine:ITextLine) {
        return ((textLine.start) / 100) <= this.currentTime && this.currentTime <= (textLine.start + textLine.dur) / 100
    }

    render() {
        // console.log(this.currentTime, this.duration);
        var data = this.props.resolved.data;
        const lines = data.lines.filter(line => Boolean(data.textLines[line.en])).map(line => {
            return {
                en: data.textLines[line.en],
                ru: data.textLines[line.ru],
            }
        });

        const resizeKoef = 4;
        const lineH = 50;
        const connectorWidth = 50;
        const halfLineH = lineH / 2;

        const positions = lines.map(line => (line.en.start + line.en.dur / 2) / resizeKoef);
        const renderLines = new LineAllocator(positions, 50).allocateRenderLines();
        const svgWidth = 100;
        const svgHeight = Math.max(positions[positions.length - 1] + 100, renderLines[renderLines.length - 1] + halfLineH);
        const duration = data.mediaFiles[data.post.video].duration;
        const durationY = duration * 100 / resizeKoef;
        console.log(durationY);


        const thumbImg = `http://localhost:1335/` + data.mediaFiles[data.post.thumbs].url;
        const thumbWidth = 200;
        const thumbHeight = 100;
        const thumbsPerLine = 20;
        const thumbShift = -thumbHeight / 2;
        const thumbsCount = durationY / thumbHeight | 0;
        const thumbsItems:{top:number;imgTop:number;imgLeft:number}[] = [];
        for (var i = 0; i < thumbsCount; i++) {
            const k = Math.round(i * thumbHeight / durationY * duration);
            thumbsItems.push({
                top: i * thumbHeight + thumbShift,
                imgTop: k / thumbsPerLine | 0,
                imgLeft: k % thumbsPerLine * thumbWidth,
            })
        }
        return <div>
            {this.currentTime}
            <svg className="timeline" width={svgWidth} height={svgHeight}>
                {renderLines.map((pos, i) => {
                    const textLine = lines[i].en;
                    const tl = textLine.start / resizeKoef;
                    const bl = (textLine.start + textLine.dur) / resizeKoef;
                    const tr = pos - halfLineH;
                    const br = pos + halfLineH;
                    const color = 'hsla(' + (textLine.start) + ', 50%,60%, 1)';
                    return  <path fill={color} d={svgPathGenerator(tl, bl, tr, br, connectorWidth)}/>
                    })}
            </svg>
            <div className="thumbs">
                {thumbsItems.map(thumb => <div className="thumb" style={{top: thumb.top, background: `url(${thumbImg}) ${-thumb.imgLeft}px ${-thumb.imgTop}px`}}>
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
                <button onClick={()=>this.player.pauseVideo()}>Stop</button>
                    :
                <button onClick={()=>this.player.playVideo()}>Play</button>
                    }
            </div> : null}
            <div>
                <meter value={this.currentTime + ''} max={this.duration + ''}/>
            </div>
            <div className="subtitles">
                {lines.map((line, i) =>
                <div className={classNames("line", {selected: this.isSelected(line.en)})}
                     style={{top: renderLines[i]}}>
                    <div className="en">{line.en ? line.en.text : ''}</div>
                    <div className="ru">{line.ru ? line.ru.text : ''}</div>
                </div>)}
            </div>
        </div>
    }
}
