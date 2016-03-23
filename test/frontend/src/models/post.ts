import {IGetPost} from "../../../interfaces/transport";
import {Line} from "./line";
export class PostModel {
    lines:Line[];

    constructor(public data:IGetPost) {
        this.lines = this.getLines();
    }

    private getLines() {
        var data = this.data;
        const shiftEnSubs = data.mediaFiles[data.post.enSub].shiftTime * 100;
        const shiftRuSubs = data.mediaFiles[data.post.ruSub].shiftTime * 100;
        const shiftEnAudio = data.mediaFiles[data.post.enAudio].shiftTime * 100;
        const shiftRuAudio = data.mediaFiles[data.post.ruAudio].shiftTime * 100;
        return data.lines.filter(line => Boolean(data.textLines[line.en])).map(line => {
            const en = data.textLines[line.en];
            const ru = data.textLines[line.ru];
            if (en) {
                en.start -= shiftEnAudio - shiftEnSubs;
            }
            if (ru && shiftRuAudio) {
                ru.start -= shiftRuAudio - shiftRuSubs;
            }
            return {
                en: en,
                ru: ru
            }
        });
    }

    static fetch(id:number):Promise<PostModel> {
        return fetch('http://localhost:1335/v1/post/' + id).then(data => data.json()).then(data => {
            return new PostModel(data.data);
        });
    }
}
