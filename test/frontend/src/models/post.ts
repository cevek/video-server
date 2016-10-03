import {IGetPost} from "../../../backend/interfaces/transport";
import {Line} from "./line";
import {prop} from "../../atom-next/prop";
import {IPosts, IMediaFiles, ITextLines} from "../../../backend/interfaces/db-models";
import {HashMap} from "../utils/hashmap";
export class PostModel {
    @prop lines: Line[];
    @prop post: IPosts;

    textLines: HashMap<ITextLines>
    mediaFiles: HashMap<IMediaFiles>


    constructor(protected json: IGetPost) {
        this.post = json.post;
        this.textLines = new HashMap(json.textLines);
        this.mediaFiles = new HashMap(json.mediaFiles);
        this.lines = this.getLines();
    }

    private getLines() {
        var data = this.json;


        /*
                    const shiftEnSubs = this.mediaFiles.getOrThrow(data.post.enSub).shiftTime * 100;
                    const shiftRuSubs = this.mediaFiles.getOrThrow(data.post.ruSub).shiftTime * 100;
                    const shiftEnAudio = this.mediaFiles.getOrThrow(data.post.enAudio).shiftTime * 100;
                    const shiftRuAudio = this.mediaFiles.getOrThrow(data.post.ruAudio).shiftTime * 100;
        */
        const newData = data.lines.map(line => {
            const en = this.textLines.get(line.en);
            const ru = this.textLines.get(line.ru);
/*
                if (en) {
                    en.start -= shiftEnAudio - shiftEnSubs;
                }
                if (ru && shiftRuAudio) {
                    ru.start -= shiftRuAudio - shiftRuSubs;
                }
*/
            return {
                en: en,
                ru: ru,
                speaker: data.speakers[line.speaker]
            }
        });
        newData.sort((a, b) => a.en.start < b.en.start ? -1 : 1);
        return newData;
    }

    static fetch(id: number): Promise<PostModel> {
        return fetch('http://localhost:1335/v1/post/' + id).then(data => data.json()).then(data => {
            return new PostModel(data.data);
        });
    }
}
