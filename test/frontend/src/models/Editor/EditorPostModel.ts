import {PostModel} from "../post";
import {EditorLine} from "./EditorLine";
import {EditorTextLine} from "./EditorTextLine";
import {prop} from "atom-next";
import {EditorHistoryStringData} from "../../utils/history";
import {EditorSpeakerList} from "../../editor/editor-speakerlist-model";
import {Lang} from "../Lang";
import {IGetPost} from "../IGetPost";
import {IMediaFiles} from "../DBModels";

export class EditorPostModel extends PostModel {
    @prop postModel: PostModel;
    @prop lines: EditorLine[];
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

        this.lines = this.lines.map(line =>
            new EditorLine(
                new EditorTextLine(Lang.EN, line.en.start, line.en.dur, line.en.text),
                new EditorTextLine(Lang.RU, line.ru.start, line.ru.dur, line.ru.text),
                line.speaker
            ))
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