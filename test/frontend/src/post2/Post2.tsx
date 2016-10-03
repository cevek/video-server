import * as React from "react";
import * as classNames from "classnames";
import {PostModel} from "../models/post";
import * as styles from "./Post2.css";
import {prop} from "../../atom-next/prop";
import {autowatch} from "../../atom-next/autowatch";
import {LineAllocator} from "../utils/time-allocate";
interface Post2Props {
    params: any;
    resolved: PostModel;
}

export class Ref<T> {
    ref = Math.random().toString(33).substr(2, 5);

    constructor(private component: any) {

    }

    get element() {
        return this.component.refs[this.ref] as T;
    }
}


export interface DocKeyProps {
    onKeyUp?: (event: KeyboardEvent) => void;
    onKeyPress?: (event: KeyboardEvent) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
}

export class DocKey extends React.Component<DocKeyProps, {}> {
    docEvents = new DocEvents();

    componentWillMount() {
        this.docEvents
            .addEvent('keyup', this.props.onKeyUp)
            .addEvent('keydown', this.props.onKeyDown)
            .addEvent('keypress', this.props.onKeyPress)
    }

    componentWillUnmount() {
        this.docEvents.unmount();
    }
}

export class DocEvents {
    private events: string[] = [];
    private callbacks: ((event: Event)=>void)[] = [];

    addEvent(eventName: string, callback: (event: Event)=>void) {
        if (eventName && callback) {
            this.events.push(eventName);
            this.callbacks.push(callback);
            document.addEventListener(eventName, callback);
        }
        return this;
    }

    unmount() {
        for (let i = 0; i < this.events.length; i++) {
            document.removeEventListener(this.events[i], this.callbacks[i]);
        }
    }
}


export interface DocMouseProps {
    onClick?: (event: MouseEvent) => void;
    onContextMenu?: (event: MouseEvent) => void;
    onDoubleClick?: (event: MouseEvent) => void;
    onMouseDown?: (event: MouseEvent) => void;
    onMouseEnter?: (event: MouseEvent) => void;
    onMouseLeave?: (event: MouseEvent) => void;
    onMouseMove?: (event: MouseEvent) => void;
    onMouseOut?: (event: MouseEvent) => void;
    onMouseOver?: (event: MouseEvent) => void;
    onMouseUp?: (event: MouseEvent) => void;
}

export class DocMouse extends React.Component<DocMouseProps, {}> {
    docEvents = new DocEvents();

    componentWillMount() {
        this.docEvents
            .addEvent('click', this.props.onClick)
            .addEvent('contextmenu', this.props.onContextMenu)
            .addEvent('doubleclick', this.props.onDoubleClick)
            .addEvent('mousedown', this.props.onMouseDown)
            .addEvent('mouseenter', this.props.onMouseEnter)
            .addEvent('mouseleave', this.props.onMouseLeave)
            .addEvent('mousemove', this.props.onMouseMove)
            .addEvent('mouseout', this.props.onMouseOut)
            .addEvent('mouseover', this.props.onMouseOver)
            .addEvent('mouseup', this.props.onMouseUp)
    }

    componentWillUnmount() {
        this.docEvents.unmount();
    }
}

export class LocalStorageValue<T> {
    protected static storeAvail = false;
    protected value: T = void 0;
    protected static storageChecked = false;

    static onError: (err: Error)=>void = null;

    constructor(protected name: string) {
        if (!LocalStorageValue.storageChecked) {
            LocalStorageValue.checkLocalStorage();
            LocalStorageValue.storageChecked = true;
            window.addEventListener('storage', this.onStorageChange);
        }
    }

    protected onStorageChange = (event: StorageEvent) => {
        if (event.key == this.name) {
            this._get();
        }
    }

    protected static checkLocalStorage() {
        const test = Math.random().toString(32);
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            LocalStorageValue.storeAvail = true;
        } catch (e) {
            LocalStorageValue.catchError(e);
        }
    }

    protected static catchError(err: Error) {
        if (LocalStorageValue.onError) {
            LocalStorageValue.onError(err);
        } else {
            setTimeout(() => {
                throw err;
            })
        }
    }

    set(value: T) {
        if (LocalStorageValue.storeAvail && this.value !== value) {
            this._set(value);
        }
        this.value = value;
    }

    protected _set(value: T) {
        console.log("Save", this.name, this.value);
        try {
            localStorage.setItem(this.name, JSON.stringify(value));
        } catch (e) {
            LocalStorageValue.catchError(e);
        }
    }

    get(force?: boolean) {
        if (LocalStorageValue.storeAvail && (this.value === void 0 || force)) {
            this._get();
        }
        return this.value;
    }

    protected _get() {
        try {
            this.value = JSON.parse(localStorage.getItem(this.name));
        } catch (e) {
            LocalStorageValue.catchError(e);
        }
        console.log("Read", this.name, this.value);
    }
}

class VideoPlayerVM {
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
        this.video.element.currentTime = time;
        if (this.currentTime !== time && !forceNextSeek) {
            this.skipNextSeek = true;
        }
        this.currentTime = time;
        this.play();
    }

    play() {
        this.video.element.play();
    }

    stop() {
        this.video.element.pause();
    }
}


class LineCalc {
    constructor(public resizeKoef: number) {

    }

    timeToPx(time: number) {
        return time * 100 / this.resizeKoef;
    }
}

@autowatch
export class Post2_ extends React.Component<Post2Props, {}> {
    static load(params: any) {
        return PostModel.fetch(params.id);
    }

    currentTime = 0;
    @prop currentSelectedLine = -1;

    captureTime = false;

    video = new Ref<HTMLVideoElement>(this);
    overlay = new Ref<HTMLElement>(this);
    // linesRef: Ref<HTMLElement>[] = this.resolved.pos;

    storageValue = new LocalStorageValue<any>('post_' + this.props.resolved.post.id);

    componentDidMount() {
        const storagePost = this.storageValue.get();
        if (storagePost) {
            this.video.element.currentTime = storagePost.currentTime;
            console.log("Set CurrentTime", storagePost.currentTime);
            this.currentTime = storagePost.currentTime;
            // this.findClosestLineByTime(storagePost.currentTime);
        }
        this.scrollToView();
    }

    scrollToView() {
        if (!this.skipNextScrollToView) {
            this.overlay.element.scrollTop = this.currentTime * 100 / this.resizeKoef - 50;
        }
        this.skipNextScrollToView = false;
    }


    onPlay = () => {
        this.captureTime = true;
        this.updateCurrentTime();
    }

    updateCurrentTime = () => {
        this.currentTime = this.video.element.currentTime;
        this.updateCurrentSelectedLine();
        if (this.captureTime) {
            setTimeout(this.updateCurrentTime, 16);
        }
    }

    updateCurrentSelectedLine() {
        const post = this.props.resolved;
        let currentTime = this.currentTime * 100;
        for (let i = 0; i < post.lines.length; i++) {
            const line = post.lines[i];
            if (line.en.start <= currentTime && line.en.start + line.en.dur > currentTime) {
                this.currentSelectedLine = i;
                return;
            }
        }
        this.currentSelectedLine = -1;
    }

    findClosestLineByTime(time: number) {
        const post = this.props.resolved;
        let minTime = Infinity;
        for (let i = 0; i < post.lines.length; i++) {
            const line = post.lines[i];
            let diffTime = Math.abs(line.en.start + line.en.dur - this.currentTime);
            if (diffTime > minTime) {
                return i - 1;
            }
            minTime = diffTime;
        }
        return -1;
    }

    onStop = () => {
        this.captureTime = false;
        this.storageValue.set({
            currentTime: this.currentTime
        });
        console.log("Save CurrentTime", this.currentTime);
    }

    onSeek = () => {
        this.currentTime = this.video.element.currentTime;
        this.storageValue.set({
            currentTime: this.currentTime
        });
        this.scrollToView();
        console.log("Save CurrentTime", this.currentTime);
    }

    onKeyPress = (event: KeyboardEvent) => {
        const video = this.video.element;
        console.log(event);

        if (event.keyCode == 32) {
            if (video.paused) {
                video.play();
                video.currentTime -= 5;
                this.skipNextScrollToView = true;
            } else {
                video.pause();
            }
        }
        event.preventDefault();
    }

    skipNextScrollToView = false;
    onLineClick = (event: any) => {
        const i = event.currentTarget.value;
        const post = this.props.resolved;
        this.playTime(post.lines[i].en.start / 100);
        this.skipNextScrollToView = true;
    }

    playTime(time: number) {
        this.video.element.currentTime = time;
        this.video.element.play();
    }

    resizeKoef = 4;

    @prop get renderLines() {
        const post = this.props.resolved;
        const positions = post.lines.map(line => (line.en.start + line.en.dur / 2) / this.resizeKoef);
        return new LineAllocator(positions, 50).allocateRenderLines();
    }

    render() {
        const post = this.props.resolved;
        const videoFile = post.mediaFiles.get(post.post.video);
        return (
            <div>
                <DocKey onKeyPress={this.onKeyPress}/>
                <video ref={this.video.ref}
                       onPlay={this.onPlay}
                       onPause={this.onStop}
                       onSeeked={this.onSeek}
                       className={styles.videoControl}
                       src={videoFile.url}
                       controls/>
                <div ref={this.overlay.ref} className={styles.videoOverlay}>
                    {post.lines.map((line, i) =>
                        <div style={{top: this.renderLines[i]}} value={i + ""} onClick={this.onLineClick}
                             className={classNames(styles.line, {[styles.selected]: this.currentSelectedLine == i})}>
                            <div className={styles.en}>
                                {line.en.text}
                            </div>
                            <div className={styles.ru}>
                                {line.ru.text}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

@autowatch
export class Post2 extends React.Component<Post2Props, {}> {
    static load(params: any) {
        return PostModel.fetch(params.id);
    }

    overlay = new Ref<HTMLElement>(this);
    video = new Ref<HTMLVideoElement>(this);
    speech: {start: number; dur: number}[];

    vm = new VideoPlayerVM(this.props.resolved.post.id, this.video);
    lineCalc = new LineCalc(4);

    constructor(props: Post2Props) {
        super(props)
        this.speech = this.speechDetector();
    }

    componentDidMount() {
        this.vm.init();
        this.autoScroll;
    }


    @prop get autoScroll() {
        this.overlay.element.scrollTop = this.lineCalc.timeToPx(this.vm.lastSeekTime) - 50;
        return 0;
    }

    @prop get currentSelectedLine() {
        const post = this.props.resolved;
        let currentTime = this.vm.currentTime * 100;
        for (let i = 0; i < post.lines.length; i++) {
            const line = post.lines[i];
            if (line.en.start <= currentTime && line.en.start + line.en.dur > currentTime) {
                return i;
            }
        }
        return -1;
    }

    @prop get renderLines() {
        const post = this.props.resolved;
        const positions = post.lines.map(line => this.lineCalc.timeToPx(line.en.start / 100 + line.en.dur / 200));
        return new LineAllocator(positions, 50).allocateRenderLines();
    }

    onKeyPress = (event: KeyboardEvent) => {
        if (event.keyCode == 32) {
            if (this.vm.stopped) {
                this.vm.play();
                this.vm.playTime(this.vm.currentTime - 5);
            } else {
                this.vm.stop();
            }
        }
        event.preventDefault();
    }

    onLineClick = (event: any) => {
        const i = event.currentTarget.value;
        const post = this.props.resolved;
        this.vm.playTime(post.lines[i].en.start / 100);
    }

    onSpeechClick = (event: any) => {
        const i = event.currentTarget.value;
        this.vm.playTime(this.speech[i].start);
    }

    speechDetector() {
        return `SPKR-INFO SpeechNonSpeech 1 <NA> <NA> <NA> unknown SIL <NA>
SPEAKER SpeechNonSpeech 5 0.000 1.120 <NA> <NA> SIL <NA>
SPKR-INFO SpeechNonSpeech 1 <NA> <NA> <NA> unknown SOUND <NA>
SPEAKER SpeechNonSpeech 5 1.120 12.510 <NA> <NA> SOUND <NA>
SPKR-INFO SpeechNonSpeech 1 <NA> <NA> <NA> unknown SPEECH <NA>
SPEAKER SpeechNonSpeech 5 13.630 0.750 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 14.380 1.080 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 15.460 0.780 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 16.240 5.550 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 21.790 0.770 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 22.560 13.690 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 36.250 0.910 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 37.160 1.010 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 38.170 8.010 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 46.180 5.940 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 52.120 0.830 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 52.950 3.320 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 56.270 1.010 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 57.280 2.800 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 60.080 0.810 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 60.890 1.330 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 62.220 0.930 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 63.150 4.720 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 67.870 1.250 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 69.120 1.880 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 71.000 0.760 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 71.760 5.240 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 77.000 1.670 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 78.670 2.020 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 80.690 1.230 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 81.920 5.530 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 87.450 0.310 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 87.760 2.510 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 90.270 0.300 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 90.570 1.230 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 91.800 0.640 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 92.440 1.230 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 93.670 0.820 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 94.490 1.540 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 96.030 0.390 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 96.420 1.100 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 97.520 0.300 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 97.820 0.750 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 98.570 0.560 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 99.130 1.620 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 100.750 0.300 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 101.050 0.880 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 101.930 0.950 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 102.880 1.290 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 104.170 1.610 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 105.780 0.490 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 106.270 1.020 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 107.290 0.320 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 107.610 5.480 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 113.090 0.300 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 113.390 1.130 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 114.520 0.370 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 114.890 0.760 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 115.650 0.750 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 116.400 2.050 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 118.450 0.420 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 118.870 2.130 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 121.000 0.750 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 121.750 0.770 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 122.520 1.350 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 123.870 0.750 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 124.620 0.480 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 125.100 0.750 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 125.850 0.300 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 126.150 1.190 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 127.340 1.200 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 128.540 0.990 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 129.530 1.100 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 130.630 1.450 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 132.080 0.750 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 132.830 0.810 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 133.640 0.300 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 133.940 3.800 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 137.740 0.300 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 138.040 2.220 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 140.260 1.250 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 141.510 0.790 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 142.300 0.620 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 142.920 1.000 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 143.920 0.300 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 144.220 1.700 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 145.920 0.400 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 146.320 0.750 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 147.070 0.400 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 147.470 1.420 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 148.890 0.330 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 149.220 0.750 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 149.970 1.020 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 150.990 1.490 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 152.480 0.600 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 153.080 0.920 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 154.000 0.470 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 154.470 1.030 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 155.500 0.470 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 155.970 1.340 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 157.310 2.330 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 159.640 0.760 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 160.400 0.310 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 160.710 1.230 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 161.940 1.120 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 163.060 0.850 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 163.910 18.240 <NA> <NA> SOUND <NA>
SPEAKER SpeechNonSpeech 5 182.150 4.010 <NA> <NA> SIL <NA>
SPEAKER SpeechNonSpeech 5 186.160 2.080 <NA> <NA> SPEECH <NA>
SPEAKER SpeechNonSpeech 5 188.240 3.090 <NA> <NA> SIL <NA>
`.split('\n').reduce((arr, line) => {
            const r = line.split(' ');
            if (r[7] == 'SPEECH' && r[3] !== '<NA>') arr.push({start: +r[3], dur: +r[4]});
            return arr;
        }, []);
    }

    render() {

        const post = this.props.resolved;
        const videoFile = post.mediaFiles.get(post.post.video);
        return (
            <div>
                <DocKey onKeyPress={this.onKeyPress}/>
                <video ref={this.video.ref}
                       onPlay={this.vm.onPlay}
                       onPause={this.vm.onStop}
                       onSeeked={this.vm.onSeek}
                       className={styles.videoControl}
                       src={videoFile.url}
                       controls/>
                <div ref={this.overlay.ref} className={styles.videoOverlay}>
                    <CurrentTime vm={this.vm} lineCalc={this.lineCalc}/>
                    {this.speech.map((sp, i) =>
                        <div
                            onClick={this.onSpeechClick}
                            className={styles.speechDetector}
                            value={i + ''}
                            style={{top: this.lineCalc.timeToPx(sp.start), height: this.lineCalc.timeToPx(sp.dur)}}/>
                    )}
                    {post.lines.map((line, i) =>
                        <div>
                            <div
                                className={styles.realTime}
                                style={{top: this.lineCalc.timeToPx(line.en.start/100), height: this.lineCalc.timeToPx(line.en.dur/100), background: '#'+(i * 123757631).toString(16).substr(2,6) }}/>
                            <div style={{top: this.renderLines[i]}}
                                 data-start={line.en.start}
                                 value={i + ""}
                                 onClick={this.onLineClick}
                                 className={classNames(styles.line, {[styles.selected]: this.currentSelectedLine == i})}>

                                <div className={styles.speaker}
                                     title={line.speaker.name}
                                     style={{backgroundImage: `url(${post.mediaFiles.get(line.speaker.photo).url})`}}>
                                </div>

                                <div className={styles.en}>
                                    {line.en.text}
                                </div>

                                <div className={styles.ru}>
                                    {line.ru.text}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
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
            <div className={styles.currentTime}
                 style={{height: this.props.lineCalc.timeToPx(this.props.vm.currentTime)}}/>
        )
    }
}


// line allocator breaks on 263858198477721, 269195097218296