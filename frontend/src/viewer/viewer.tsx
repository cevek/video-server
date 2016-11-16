import * as React from "react";
import {PostModel} from "./../models/post";
import {Thumbs} from "./thumbs";
import {Timeline} from "./timeline";
import {TimelineConnector} from "./timeline-connector";
import {disposer} from "../utils/time-allocate";
import {Subtitles} from "./subtitles";
import {AudioPlayer} from "../utils/audio-player";
import {EditorHistory} from "../utils/history";
import "./viewer.scss";
import {config} from "../config";
import {EditorModel} from "../models/Editor/EditorModel";

export class Viewer extends React.Component<{params: any, resolved: PostModel}, {}> {
    audioPlayer = new AudioPlayer();
    history = new EditorHistory();
    postModel = this.props.resolved;
    model: EditorModel;// todo

    static load(params:any) {
        return PostModel.fetch(params.id);
    }

    componentDidMount() {
        const enAudio = this.postModel.mediaFiles.getOrThrow(this.postModel.post.enAudio);
        const url = config.baseUrl + '/' + enAudio.url;
        this.audioPlayer.loadSound(url);
    }

    render() {
        const lineH = 50;
        const resizeKoef = 4;

        const positions = this.postModel.enLines.map(en => ({top: (en.start) / resizeKoef, bottom: (en.start + en.dur) / resizeKoef, height: 50}));
        const renderLines = disposer(positions);

        return <div>
            <div className="toolbar">
                <button onClick={()=>this.history.undo()}>Undo</button>
                <button onClick={()=>this.history.redo()}>Redo</button>
            </div>
            {this.audioPlayer.soundLoaded ?
                <div>
                    <Timeline model={this.model}/>
                    <TimelineConnector model={this.model}/>
                </div> : null
            }
            <Thumbs postModel={this.postModel} model={null} resizeKoef={resizeKoef}/>
            {/*<Video postModel={postModel} resizeKoef={resizeKoef}/>*/}
            <Subtitles postModel={this.postModel} player={this.audioPlayer} resizeKoef={resizeKoef}
                       renderLines={renderLines}/>
        </div>
    }
}
