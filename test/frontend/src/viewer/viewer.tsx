import * as React from "react";
import {PostModel} from "./../models/post";
import {Thumbs} from "./thumbs";
import {Timeline} from "./timeline";
import {TimelineConnector} from "./timeline-connector";
import {LineAllocator} from "../utils/time-allocate";
import {Subtitles} from "./subtitles";
import {AudioPlayer} from "../utils/audio-player";
import "./viewer.css";
import {config} from "../../../backend/config";

export class Viewer extends React.Component<{params: any, resolved: PostModel}, {}> {
    audioPlayer = new AudioPlayer();

    static load(params:any) {
        return PostModel.fetch(params.id);
    }

    componentDidMount() {
        var data = this.props.resolved.data;
        const enAudio = data.mediaFiles[data.post.enAudio];
        const url = config.baseUrl + '/' + enAudio.url;
        this.audioPlayer.loadSound(url).then(() => {
            this.forceUpdate();
        })
    }


    render() {
        const postModel = this.props.resolved;
        const lineH = 50;
        const resizeKoef = 4;

        const positions = postModel.lines.map(line => (line.en.start + line.en.dur / 2) / resizeKoef);
        const renderLines = new LineAllocator(positions, 50).allocateRenderLines();

        return <div>
            {this.audioPlayer.soundLoaded ?
                <div>
                    <Timeline postModel={postModel} resizeKoef={resizeKoef} player={this.audioPlayer}/>
                    <TimelineConnector postModel={postModel} lineH={lineH} resizeKoef={resizeKoef}
                                       player={this.audioPlayer}
                                       renderLines={renderLines}/>
                </div> : null
            }
            <Thumbs postModel={postModel} resizeKoef={resizeKoef}/>
            {/*<Video postModel={postModel} resizeKoef={resizeKoef}/>*/}
            <Subtitles postModel={postModel} player={this.audioPlayer} resizeKoef={resizeKoef}
                       renderLines={renderLines}/>
        </div>
    }
}
