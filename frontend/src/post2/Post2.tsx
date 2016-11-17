import * as React from "react";
import * as classNames from "classnames";
import {autowatch} from "atom-next";
import {Group} from "../utils/GroupMaker";
import {PostViewModel} from "../models/Editor/PostViewModel";
import {Ref} from "../lib/Ref";
import {VideoPlayerVM} from "../models/Editor/VideoPlayerVM";
import {DocKey} from "../lib/DocKey";
import {LineCalc} from "../models/Editor/LineCalc";
import {EditorText} from "../editor/EditorText";
import {EditorModel} from "../models/Editor/EditorModel";
import "./Post2.scss";
import {Timeline} from "../viewer/Timeline";
import {TimelineConnector} from "../viewer/TimelineConnector";

interface Post2Props {
    params: any;
    resolved: EditorModel;
}

@autowatch
export class Post2 extends React.Component<Post2Props, {}> {
    static load(params: any) {
        return EditorModel.fetch(params.id)
    }

    model = this.props.resolved;
    overlay = new Ref<HTMLElement>();

    render() {
        const {model} = this;
        const videoFile = model.post.mediaFiles.get(model.post.post.video);
        return (
            <div>
                <VideoView videoModel={model.videoPlayer} url={videoFile.url}/>

                <div ref={this.overlay.onRender} className="post__video_overlay">
                    <CurrentTime vm={model.videoPlayer} lineCalc={model.lineCalc}/>

                    <EditorText model={this.model}/>
                    <TimelineConnector model={this.model}/>
                    <Timeline model={this.model}/>

                    <div className="post__groups">
                        {model.post.groups.groups.map((group, i) =>
                            <GroupView key={i} model={model} group={group} groupPos={i}/>)}
                    </div>
{/*
                    {model.post.lines.map((line, i) =>
                        <LineView key={i} model={model} line={line} lineN={i}/>)}
*/}
                </div>
            </div>
        );
    }
}


interface LineViewProps {
    model: PostViewModel;
    lineN: number;
}

@autowatch
export class LineView extends React.Component<LineViewProps, {}> {
    onLineClick = () => {
        const {model, lineN} = this.props;
        model.videoPlayer.playTime(model.post.enLines.get(lineN).start / 100);
    }

    render() {
        const {model, lineN} = this.props;
        const en = model.post.enLines.get(lineN);
        const ru = model.post.ruLines.get(lineN);
        const speaker = model.post.speakerLines.get(lineN);
        const {top, height} = model.renderLines[lineN];
        const realTimeTop = model.lineCalc.timeToPx(en.start / 100);
        const realTimeHeight = model.lineCalc.timeToPx(en.dur / 100);
        const realTimeBgColor = '#' + ('00000' + (426356753 * lineN).toString(16)).slice(-6);
        return (
            <div>
                <div className="post__real_time"
                     style={{top: realTimeTop, height: realTimeHeight, background: realTimeBgColor }}/>

                <div style={{top, height}}
                     data-start={en.start}
                     onClick={this.onLineClick}
                     className={classNames('post__line', model.currentSelectedLine == lineN && 'post__selected')}>

                    <div className="post__speaker"
                         title={speaker.name}
                         style={{backgroundImage: 'url('+speaker.photo+ ')' }}>
                    </div>

                    {/*<TextLine lang={Lang.EN} line={line} linePos={lineN} model={model}/>*/}
                    {/*<TextLine lang={Lang.RU} line={line} linePos={lineN} model={model}/>*/}
                </div>
            </div>
        );
    }
}


interface VideoViewProps {
    videoModel: VideoPlayerVM;
    url: string;
}

@autowatch
export class VideoView extends React.Component<VideoViewProps, {}> {
    componentDidMount() {
        const {videoModel} = this.props;
        videoModel.init();
    }

    onKeyPress = (event: KeyboardEvent) => {
        const {videoModel} = this.props;
        if (event.keyCode == 32) {
            if (videoModel.stopped) {
                videoModel.play();
                videoModel.playTime(videoModel.currentTime - 5);
            } else {
                videoModel.stop();
            }
        }
        event.preventDefault();
    }

    render() {
        const {videoModel, url} = this.props;
        return (
            <div>
                <DocKey onKeyPress={this.onKeyPress}/>
                <video ref={videoModel.video.onRender}
                       onPlay={videoModel.onPlay}
                       onPause={videoModel.onStop}
                       onSeeked={videoModel.onSeek}
                       className="post__video_control"
                       src={url}
                       controls/>
            </div>
        );
    }
}

interface GroupViewProps {
    model: PostViewModel;
    group: Group;
    groupPos: number;
}

@autowatch
export class GroupView extends React.Component<GroupViewProps, {}> {
    props: GroupViewProps;

    onSplitGroup(linePos: number) {
        const {model, groupPos} = this.props;
        model.post.groups.split(groupPos, linePos);
    }

    onJoinGroup = () => {
        const {model, groupPos} = this.props;
        model.post.groups.joinWithNext(groupPos - 1);
    }

    render() {
        // console.log('render groupview');

        const {model, group, groupPos} = this.props;
        const top = model.renderLines[group.start].top;
        const height = model.renderLines[group.end].bottom - top;
        const lines = new Array(group.end - group.start).fill(0);
        return (
            <div className="post__group" style={{top: top, height: height}}>
                {groupPos > 0 ?
                    <div onClick={this.onJoinGroup} className="post__join-group"/> : null}
                {lines.map((v, linePos) =>
                    <div key={linePos}
                         className="post__splitter"
                         onClick={()=>this.onSplitGroup(linePos)}
                         style={{top: model.renderLines[linePos + group.start].bottom - top}}/>
                )}
            </div>
        );
    }
}


interface CurrentTimeProps {
    vm: VideoPlayerVM;
    lineCalc: LineCalc;
}

@autowatch
class CurrentTime extends React.Component<CurrentTimeProps, {}> {
    render() {
        return (
            <div className="post__current_time"
                 style={{height: this.props.lineCalc.timeToPx(this.props.vm.currentTime)}}/>
        )
    }
}

