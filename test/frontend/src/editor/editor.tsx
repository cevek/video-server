import * as React from "react";
import {PostModel} from "./../models/post";
import {Thumbs} from "../viewer/thumbs";
import {Timeline} from "../viewer/timeline";
import {TimelineConnector} from "../viewer/timeline-connector";
import {AudioPlayer} from "../utils/audio-player";
import {disposer} from "../utils/time-allocate";
import {EditorText} from "./editor-text";
import * as style from "./styles/editor.css";
import {EditorToolbar} from "./toolbar/toolbar";
import {EditorTitle} from "./editor-title";
import {EditorTags} from "./editor-tags";
import {prop} from "atom-next";
import {autowatch} from "atom-next";
import {EditorModel} from "../models/Editor/EditorModel";
import {config} from "../config";


@autowatch
export class Editor extends React.Component<{params: any, resolved: EditorModel}, {}> {
    @prop model = this.props.resolved;
    @prop audioPlayer = new AudioPlayer();

    static load(params:any) {
        return PostModel.fetch(params.id).then(data => new EditorModel(data));
    }

    componentDidMount() {
        (window as any).editorHistory = this.model.history;
        const enAudio = this.model.post.mediaFiles.getOrThrow(this.model.post.enAudio);
        const url = config.baseUrl + '/' + enAudio.url;
        this.audioPlayer.loadSound(url);
    }

    render() {
        const postModel = this.model.post;

        // const positions = this.model.postModel.lines.map(line => (line.en.start + line.en.dur / 2) / this.model.resizeKoef);
        const positions = this.model.post.lines.map(line => ({top: (line.en.start) / this.model.lineCalc.resizeKoef,bottom: (line.en.start + line.en.dur) / this.model.lineCalc.resizeKoef, height: 50}));
// console.log(positions, positions2);

        const renderLines = disposer(positions);// new LineAllocator(positions, 50).allocateRenderLines();


        return <div className={style.editor}>
            <div className={style.editorMain}>
                <EditorTitle model={this.model}/>
                <EditorTags model={this.model}/>
                <EditorText model={this.model}/>
            </div>
            {this.audioPlayer.soundLoaded ?
                <div>
                    <Timeline resizeKoef={this.model.lineCalc.resizeKoef} audioSelectionModel={this.model.audioSelection} player={this.audioPlayer}/>
                    <TimelineConnector lines={this.model.post.lines}
                                       resizeKoef={this.model.lineCalc.resizeKoef}
                                       player={this.audioPlayer}
                                       audioSelectionModel={this.model.audioSelection}
                                       history={this.model.history}
                                       renderLines={renderLines}/>
                </div> : null
            }
            <Thumbs postModel={postModel} model={this.model} resizeKoef={this.model.lineCalc.resizeKoef}/>
            <EditorToolbar model={this.model}/>
        </div>
    }
}

