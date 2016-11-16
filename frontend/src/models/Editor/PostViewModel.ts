import {PostModel} from "../post";
import {prop} from "atom-next";
import {disposerWithGroup} from "../../utils/time-allocate";
import {VideoPlayerVM} from "./VideoPlayerViewModel";
import {LineCalc} from "./LineCalc";
import {Ref} from "../../lib/Ref";
import {AudioSelectionData} from "../../audio-selection-model";
import {AudioPlayer} from "../../utils/audio-player";
export class Post2Model {
    post: PostModel;
    videoPlayer: VideoPlayerVM;
    lineCalc = new LineCalc(5);
    audioSelection = new AudioSelectionData();
    player = new AudioPlayer();

    constructor(post: PostModel) {
        this.post = post;
        this.videoPlayer = new VideoPlayerVM(this.post.post.id, new Ref<HTMLVideoElement>());
    }

    @prop get renderLines() {
        const positions = this.post.enLines.map(en => ({
            top: this.lineCalc.timeToPx(en.start / 100),
            bottom: this.lineCalc.timeToPx(en.start / 100 + en.dur / 100),
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
        for (let i = 0; i < this.post.enLines.length; i++) {
            const en = this.post.enLines.get(i);
            if (en.start <= currentTime && en.start + en.dur > currentTime) {
                return i;
            }
        }
        return -1;
    }

    static fetch(id: number) {
        return PostModel.fetch(id).then(post => new Post2Model(post));
    }
}