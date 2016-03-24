import * as React from "react";
import {PostModel} from "./../models/post";
import {EditorModel} from "./editor-model";
import {Thumbs} from "../viewer/thumbs";
import {Timeline} from "../viewer/timeline";
import {TimelineConnector} from "../viewer/timeline-connector";
import {AudioPlayer} from "../utils/audio-player";
import {LineAllocator} from "../utils/time-allocate";
import {EditorText} from "./editor-text";
import {config} from "../../../backend/config";
import "./editor.css";

export class Editor extends React.Component<{params: any, resolved: EditorModel}, {}> {
    model = this.props.resolved;
    audioPlayer = new AudioPlayer();


    static load(params:any) {
        return PostModel.fetch(params.id).then(data => new EditorModel(data));
    }

    componentDidMount() {
        (window as any).editorHistory = this.model.history;
        var data = this.model.postModel.data;
        const enAudio = data.mediaFiles[data.post.enAudio];
        const url = config.baseUrl + '/' + enAudio.url;
        this.audioPlayer.loadSound(url).then(() => {
            this.forceUpdate();
        })
    }

    render() {
        const postModel = this.model.postModel;

        // const positions = this.model.postModel.lines.map(line => (line.en.start + line.en.dur / 2) / this.model.resizeKoef);
        const positions = this.model.lines.map(line => (line.en.start + line.en.dur / 2) / this.model.resizeKoef);
        // console.log(positions, positions2);

        const renderLines = new LineAllocator(positions, 50).allocateRenderLines();

        return <div className="editor">
            {this.audioPlayer.soundLoaded ?
                <div>
                    <Timeline resizeKoef={this.model.resizeKoef} player={this.audioPlayer}/>
                    <TimelineConnector lines={this.model.lines} lineH={this.model.lineH} resizeKoef={this.model.resizeKoef}
                                       player={this.audioPlayer}
                                       history={this.model.history}
                                       renderLines={renderLines}/>
                </div> : null
            }
            <Thumbs postModel={postModel} resizeKoef={this.model.resizeKoef}/>
            <EditorText model={this.model} renderLines={renderLines} onChange={()=>this.forceUpdate()}/>
        </div>
    }
}

