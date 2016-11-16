import {Line} from "./Line";
import {prop} from "atom-next";
import {HashMap} from "../utils/hashmap";
import {GroupList} from "../utils/group-maker";
import {TextLine} from "./TextLine";
import {Speaker} from "./Speaker";
import {IGetPost} from "./IGetPost";
import {Lang} from "./Lang";
import {IPosts, ITextLines, IMediaFiles} from "./DBModels";
export class PostModel {
    @prop lines: Line[];
    @prop groups: GroupList;
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
        const data = this.json;

        const enSubFile = this.mediaFiles.get(data.post.enSub);
        const ruSubFile = this.mediaFiles.get(data.post.ruSub);
        const enAudioFile = this.mediaFiles.get(data.post.enAudio);
        const ruAudioFile = this.mediaFiles.get(data.post.ruAudio);

        const shiftEnSubs = enSubFile ? enSubFile.shiftTime * 100 : 0;
        const shiftRuSubs = ruSubFile ? ruSubFile.shiftTime * 100 : 0;
        const shiftEnAudio = enAudioFile ? enAudioFile.shiftTime * 100 : 0;
        const shiftRuAudio = ruAudioFile ? ruAudioFile.shiftTime * 100 : 0;

        const newData = data.lines.map(line => {
            const enJSON = this.textLines.getOrThrow(line.en);
            enJSON.start -= shiftEnAudio - shiftEnSubs;

            const ruJSON = this.textLines.getOrThrow(line.ru);
            ruJSON.start -= shiftRuAudio - shiftRuSubs;

            const en = new TextLine(Lang.EN, enJSON.start, enJSON.dur, enJSON.text);
            const ru = new TextLine(Lang.RU, ruJSON.start, ruJSON.dur, ruJSON.text);

            const speakerJSON = data.speakers[line.speaker];
            const photoFile = speakerJSON && this.mediaFiles.get(speakerJSON.photo);
            const speaker = new Speaker(speakerJSON, photoFile && photoFile.url);

            return new Line(en, ru, speaker);
        });
        newData.sort((a, b) => a.en.start < b.en.start ? -1 : 1);
        this.groups = GroupList.generateFromLines(newData, 500);
        return newData;
    }

    static fetch(id: number): Promise<PostModel> {
        return fetch('http://localhost:1335/v1/post/' + id).then(data => data.json()).then(data => {
            return new PostModel(data.data);
        });
    }
}

