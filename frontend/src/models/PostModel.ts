import {prop, AtomArray} from "atom-next";
import {HashMap} from "../utils/Hashmap";
import {GroupList} from "../utils/GroupMaker";
import {TextLine} from "./TextLine";
import {Speaker} from "./Speaker";
import {IGetPost} from "./IGetPost";
import {Lang} from "./Lang";
import {IPosts, ITextLines, IMediaFiles} from "./DBModels";
export class PostModel {
    // @prop lines: Line[];
    @prop groups: GroupList;
    @prop post: IPosts;

    enLines = new AtomArray<TextLine>();
    ruLines = new AtomArray<TextLine>();
    speakerLines = new AtomArray<Speaker>();

    textLines: HashMap<ITextLines>
    mediaFiles: HashMap<IMediaFiles>

    constructor(protected json: IGetPost) {
        this.post = json.post;
        this.textLines = new HashMap(json.textLines);
        this.mediaFiles = new HashMap(json.mediaFiles);
        this.getLines();
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

        const lines = data.lines.sort((a, b) => {
            const en1 = this.textLines.getOrThrow(a.en);
            const en2 = this.textLines.getOrThrow(b.en);
            return en1.start < en2.start ? -1 : 1;
        });
        lines.forEach(line => {
            const enJSON = this.textLines.getOrThrow(line.en);
            enJSON.start -= shiftEnAudio - shiftEnSubs;

            const ruJSON = this.textLines.getOrThrow(line.ru);
            ruJSON.start -= shiftRuAudio - shiftRuSubs;

            const en = new TextLine(Lang.EN, enJSON.start, enJSON.dur, enJSON.text);
            const ru = new TextLine(Lang.RU, ruJSON.start, ruJSON.dur, ruJSON.text);

            const speakerJSON = data.speakers[line.speaker];
            const photoFile = speakerJSON && this.mediaFiles.get(speakerJSON.photo);
            const speaker = new Speaker(speakerJSON, photoFile && photoFile.url);

            this.enLines.push(en);
            this.ruLines.push(ru);
            this.speakerLines.push(speaker);
        });
        this.groups = GroupList.generateFromLines(this.enLines.map(line => line.start), 500);
    }

    static fetch(id: number): Promise<PostModel> {
        return fetch('http://localhost:1335/v1/post/' + id).then(data => data.json()).then(data => {
            return new PostModel(data.data);
        });
    }
}

