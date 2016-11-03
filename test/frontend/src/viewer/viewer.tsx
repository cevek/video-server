import * as React from "react";
import {PostModel} from "./../models/post";
import {Thumbs} from "./thumbs";
import {Timeline} from "./timeline";
import {TimelineConnector} from "./timeline-connector";
import {disposer} from "../utils/time-allocate";
import {Subtitles} from "./subtitles";
import {AudioPlayer} from "../utils/audio-player";
import {EditorHistory} from "../utils/history";
import * as style from "./viewer.css";

export class Viewer extends React.Component<{params: any, resolved: PostModel}, {}> {
    audioPlayer = new AudioPlayer();
    history = new EditorHistory();
    postModel = this.props.resolved;

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

        const positions = this.postModel.lines.map(line => ({value: (line.en.start + line.en.dur / 2) / resizeKoef, height: 50}));
        const renderLines = disposer(positions);

        return <div>
            <div className={style.toolbar}>
                <button onClick={()=>this.history.undo()}>Undo</button>
                <button onClick={()=>this.history.redo()}>Redo</button>
            </div>
            {this.audioPlayer.soundLoaded ?
                <div>
                    <Timeline audioSelectionModel={null} resizeKoef={resizeKoef} player={this.audioPlayer}/>
                    <TimelineConnector lines={this.postModel.lines} lineH={lineH} resizeKoef={resizeKoef}
                                       player={this.audioPlayer}
                                       audioSelectionModel={null}
                                       history={this.history}
                                       renderLines={renderLines}/>
                </div> : null
            }
            <Thumbs postModel={this.postModel} model={null} resizeKoef={resizeKoef}/>
            {/*<Video postModel={postModel} resizeKoef={resizeKoef}/>*/}
            <Subtitles postModel={this.postModel} player={this.audioPlayer} resizeKoef={resizeKoef}
                       renderLines={renderLines}/>
        </div>
    }
}
