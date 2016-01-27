import './viewer.css';
import * as React from 'react';

import {PostModel} from "./../models/post";
import {ILine} from "../../../interfaces/line";
import {IGetPost} from "../../../interfaces/transport";
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

    componentDidMount() {
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

    isSelected(line:ILine) {
        var data = this.props.resolved.data;
        if (line.en) {
            var textLine = data.textLines[line.en];
            return ((textLine.start) / 100) <= this.currentTime && this.currentTime <= (textLine.start + textLine.dur) / 100
        }
        return false;
    }

    render() {
        console.log(this.currentTime, this.duration);

        var data = this.props.resolved.data;
        return <div>
            {this.currentTime}
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
                {data.lines.map(line => <div className={classNames("line", {selected: this.isSelected(line)})}>
                    <div className="en">{line.en ? data.textLines[line.en].text : ''}</div>
                    <div className="ru">{line.ru ? data.textLines[line.ru].text : ''}</div>
                </div>)}
            </div>
        </div>
    }
}
