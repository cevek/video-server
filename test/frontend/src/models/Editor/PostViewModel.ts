import {PostModel} from "../post";
import {prop} from "atom-next";
import {disposerWithGroup} from "../../utils/time-allocate";
import {VideoPlayerVM} from "./VideoPlayerViewModel";
import {LineCalc} from "./LineCalc";
import {Ref} from "../../lib/Ref";
import {AudioSelectionData} from "../../audio-selection-model";
export class Post2Model {
    post: PostModel;
    videoPlayer: VideoPlayerVM;
    lineCalc = new LineCalc(4);
    audioSelection = new AudioSelectionData();


    constructor(post: PostModel) {
        this.post = post;
        this.videoPlayer = new VideoPlayerVM(this.post.post.id, new Ref<HTMLVideoElement>());
    }

    @prop get renderLines() {
        const positions = this.post.lines.map(line => ({
            top: this.lineCalc.timeToPx(line.en.start / 100),
            bottom: this.lineCalc.timeToPx(line.en.start / 100 + line.en.dur / 100),
            height: 50
        }));
        console.log('render lines');

        // console.log(JSON.stringify(positions));
        const res = disposerWithGroup(this.post.groups.groups.slice(), positions);
        // console.log(res);
        return res;
    }

    @prop get currentSelectedLine() {
        let currentTime = this.videoPlayer.currentTime * 100;
        for (let i = 0; i < this.post.lines.length; i++) {
            const line = this.post.lines[i];
            if (line.en.start <= currentTime && line.en.start + line.en.dur > currentTime) {
                return i;
            }
        }
        return -1;
    }

    static fetch(id: number) {
        return PostModel.fetch(id).then(post => new Post2Model(post));
    }
}