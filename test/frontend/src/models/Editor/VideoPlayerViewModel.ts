import {prop} from "atom-next";
import {LocalStorageValue} from "../../post2/LocalStorageValue";
import {Ref} from "../../lib/Ref";
export class VideoPlayerVM {
    @prop currentTime = 0;
    @prop stopped = true;
    @prop lastSeekTime = 0;
    storageValue = new LocalStorageValue<number>('post_videotime_' + this.postId);
    private updateCounter = 0;
    skipNextSeek = false;

    constructor(public postId: number, public video: Ref<HTMLVideoElement>) {

    }

    onStop = () => {
        this.currentTime = this.video.element.currentTime;
        this.stopped = true;
        this.storageValue.set(this.currentTime);
        this.stopped = true;
    }

    onSeek = () => {
        this.currentTime = this.video.element.currentTime;
        this.storageValue.set(this.currentTime);
        if (!this.skipNextSeek) {
            this.lastSeekTime = this.currentTime;
        }
        this.skipNextSeek = false;
    }

    updateCurrentTime = () => {
        this.currentTime = this.video.element.currentTime;
        if (this.updateCounter++ % 100 === 0) {
            this.storageValue.set(this.currentTime);
        }
        if (!this.stopped) {
            setTimeout(this.updateCurrentTime, 16);
        }
    }

    init() {
        const savedCurrentTime = this.storageValue.get();
        if (savedCurrentTime) {
            this.playTime(savedCurrentTime, true);
        }
    }

    onPlay = () => {
        this.stopped = false;
        this.updateCurrentTime();
    }


    playTime(time: number, forceNextSeek = false) {
        if (this.currentTime !== time && !forceNextSeek) {
            this.skipNextSeek = true;
        }
        this.seek(time);
        this.play();
    }

    seek(time: number) {
        this.video.element.currentTime = time;
        this.currentTime = time;
    }

    play() {
        this.video.element.play();
    }

    stop() {
        this.video.element.pause();
    }
}
