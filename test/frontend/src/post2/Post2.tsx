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

class LocalStorage {
    onStorage = () => {

    }

    constructor() {
        window.addEventListener('storage', this.onStorage);
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

    constructor(public postId: number, public video: Ref<HTMLVideoElement>) {

    }

    onStop = () => {
        this.stopped = true;
        this.storageValue.set(this.currentTime);
        this.stopped = true;
    }

    onSeek = () => {
        this.currentTime = this.video.element.currentTime;
        this.storageValue.set(this.currentTime);
        this.lastSeekTime = this.currentTime;
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
            this.video.element.currentTime = savedCurrentTime;
            this.currentTime = savedCurrentTime;
        }
    }

    onPlay = () => {
        this.stopped = false;
        this.updateCurrentTime();
    }


    playTime(time: number) {
        this.video.element.currentTime = time;
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

    vm = new VideoPlayerVM(this.props.resolved.post.id, this.video);
    lineCalc = new LineCalc(4);

    componentDidMount() {
        this.vm.init();
        this.autoScroll;
    }

    skipNextScrollToView = false;

    @prop get autoScroll() {
        //todo: hack
        this.vm.lastSeekTime;
        if (!this.skipNextScrollToView) {
            this.overlay.element.scrollTop = this.lineCalc.timeToPx(this.vm.lastSeekTime) - 50;
        }
        this.skipNextScrollToView = false;
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
                this.skipNextScrollToView = true;
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
        this.skipNextScrollToView = true;
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
