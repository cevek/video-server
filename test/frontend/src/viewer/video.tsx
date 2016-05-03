import {locals} from "./video.css";
import * as React from "react";
import {PostModel} from "../models/post";

export class Video extends React.Component<{postModel: PostModel; resizeKoef: number;}, {}> {
    currentTime:number = 0;
    duration:number = 0;
    videoWrapper:Element;
    ytReady = false;
    isStarted = false;
    isEnded = false;
    isPlaying = false;
    videoPlayer:any;

    componentDidMount() {
        var data = this.props.postModel.data;
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
                        if (event.postModel == YT.PlayerState.ENDED) {
                            this.isEnded = true;
                        }
                        if (event.postModel == YT.PlayerState.PLAYING) {
                            this.isStarted = true;
                            this.isPlaying = true;
                        }
                        this.forceUpdate();
                    }
                }
            });
        });
    }


    render() {
        return <div>
            <div ref={d => this.videoWrapper = d} className={locals.video}>
                <div className={locals.overlay}></div>
                {!this.isStarted || this.isEnded ?
                <div className={locals.cover}></div>: null}
            </div>
            {this.ytReady ?
                <div className={locals.controls}>
                    {this.isPlaying ?
                        <button onClick={()=>this.videoPlayer.pauseVideo()}>Stop</button>
                        :
                        <button onClick={()=>this.videoPlayer.playVideo()}>Play</button>
                    }
                </div> : null}
            <div>
                <meter value={this.currentTime + ''} max={this.duration + ''}/>
            </div>
        </div>;
    }
}
