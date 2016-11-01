import * as React from "react";
import {PostModel} from "./../models/post";
import {EditorModel} from "./editor-model";
import {Thumbs} from "../viewer/thumbs";
import {Timeline} from "../viewer/timeline";
import {TimelineConnector} from "../viewer/timeline-connector";
import {AudioPlayer} from "../utils/audio-player";
import {disposer} from "../utils/time-allocate";
import {EditorText} from "./editor-text";
import {config} from "../../../backend/config";
import * as style from "./styles/editor.css";
import {EditorToolbar} from "./toolbar/toolbar";
import {EditorTitle} from "./editor-title";
import {EditorTags} from "./editor-tags";
import {prop} from "../../atom-next/prop";
import {autowatch} from "../../atom-next/autowatch";


@autowatch
export class Editor extends React.Component<{params: any, resolved: EditorModel}, {}> {
    @prop model = this.props.resolved;
    @prop audioPlayer = new AudioPlayer();

    static load(params:any) {
        return PostModel.fetch(params.id).then(data => new EditorModel().fromPostModel(data));
    }

    componentDidMount() {
        (window as any).editorHistory = this.model.history;
        const enAudio = this.model.postModel.mediaFiles.getOrThrow(this.model.postModel.post.enAudio);
        const url = config.baseUrl + '/' + enAudio.url;
        this.audioPlayer.loadSound(url);
    }

    render() {
        const postModel = this.model.postModel;

        // const positions = this.model.postModel.lines.map(line => (line.en.start + line.en.dur / 2) / this.model.resizeKoef);
        const positions = this.model.lines.map(line => ({value: (line.en.start + line.en.dur / 2) / this.model.resizeKoef, height: 50}));
// console.log(positions, positions2);

        const renderLines = disposer(positions);// new LineAllocator(positions, 50).allocateRenderLines();


        return <div className={style.editor}>
            <div className={style.editorMain}>
                <EditorTitle model={this.model}/>
                <EditorTags model={this.model}/>
                <EditorText model={this.model} renderLines={renderLines}/>
            </div>
            {this.audioPlayer.soundLoaded ?
                <div>
                    <Timeline resizeKoef={this.model.resizeKoef} audioSelectionModel={this.model.audioSelection} player={this.audioPlayer}/>
                    <TimelineConnector lines={this.model.lines} lineH={this.model.lineH} resizeKoef={this.model.resizeKoef}
                                       player={this.audioPlayer}
                                       audioSelectionModel={this.model.audioSelection}
                                       history={this.model.history}
                                       renderLines={renderLines}/>
                </div> : null
            }
            <Thumbs postModel={postModel} model={this.model} resizeKoef={this.model.resizeKoef}/>
            <EditorToolbar model={this.model}/>
        </div>
    }
}

