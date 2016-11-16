import {PostModel} from "../PostModel";
import {EditorTextLine} from "./EditorTextLine";
import {prop, AtomArray} from "atom-next";
import {EditorHistoryStringData} from "../../utils/History";
import {EditorSpeakerList} from "../../editor/EditorSpeakerlistModel";
import {Lang} from "../Lang";
import {IGetPost} from "../IGetPost";

export class EditorPostModel extends PostModel {
    @prop postModel: PostModel;
    @prop enLines: AtomArray<EditorTextLine>;
    @prop ruLines: AtomArray<EditorTextLine>;
    // @prop lines: EditorLine[];
    /*
     @prop history = new EditorHistory()
     .listen(historyTitle, this.historySetTitle)
     .listen(historyTags, this.historySetTags)
     */

    @prop title = '';
    @prop tags = '';
    @prop speakers: EditorSpeakerList;
    cover: number;
    enAudio: number;

    constructor(json: IGetPost) {
        super(json);
        this.enLines = new AtomArray(this.enLines.map(en => new EditorTextLine(Lang.EN, en.start, en.dur, en.text)));
        this.ruLines = new AtomArray(this.ruLines.map(ru => new EditorTextLine(Lang.RU, ru.start, ru.dur, ru.text)));
    }


    historySetTitle = (data: EditorHistoryStringData, isRedo: boolean) => {
        this.title = isRedo ? data.newValue : data.oldValue
    }

    historySetTags = (data: EditorHistoryStringData, isRedo: boolean) => {
        this.tags = isRedo ? data.newValue : data.oldValue
    }

    setTitle(title: string) {
 /*       this.history.add(new EditorHistoryStringData({
            type: historyTitle,
            newValue: title,
            oldValue: this.title,
        }));*/
        this.title = title;
    }

    setTags(tags: string) {
/*        this.history.add(new EditorHistoryStringData({
            type: historyTags,
            newValue: tags,
            oldValue: this.tags,
        }));*/
        this.tags = tags;
    }

    save() {

    }

    //todo:
    static fetch(id: number): Promise<EditorPostModel> {
        return fetch('http://localhost:1335/v1/post/' + id).then(data => data.json()).then(data => {
            return new EditorPostModel(data.data);
        });
    }
}