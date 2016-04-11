import {EditorHistoryData} from "../utils/history";
import {prop, BaseArray} from "../../models";
import {EditorModel} from "./editor-model";

enum SpeakersListHistoryType{
    ADD = 1,
    CHANGE = 2,
    REMOVE = 3
}
class SpeakersListHistory extends EditorHistoryData {
    static type = 'speakers-list'
    type = SpeakersListHistory.type;
    subtype:SpeakersListHistoryType;
    oldVal:string;
    pos:number;
    speaker:string;
    affectLines:number[];

    constructor(json:SpeakersListHistory) {
        super(json);
    }
}

export class EditorSpeakerList {
    @prop list = new BaseArray<string>([]);

    constructor(public model:EditorModel) {
        this.model.history.listen(this.onHistory)
    }

    onHistory = (data:SpeakersListHistory, isRedo:boolean) => {
        if (data.type == SpeakersListHistory.type) {
            if (data.subtype == SpeakersListHistoryType.ADD) {
                if (isRedo) {
                    this.list.push(data.speaker);
                }
                else {
                    this.list.pop();
                }
            }
            else if (data.subtype == SpeakersListHistoryType.CHANGE) {
                this.list.set(data.pos, isRedo ? data.speaker : data.oldVal);
                if (isRedo) {
                    this.renameLineSpeakers(data.oldVal, data.speaker);
                }
                else {
                    this.renameLineSpeakers(data.speaker, data.oldVal);
                }
            }
            else if (data.subtype == SpeakersListHistoryType.REMOVE) {
                if (isRedo) {
                    this.list.splice(data.pos, 1);
                    this.removeLineSpeakers(data.oldVal);
                }
                else {
                    this.list.splice(data.pos, 0, data.oldVal);
                    this.restoreLineSpeakers(data.affectLines, data.oldVal);
                }
            }
        }
    }

    remove(pos:number) {
        const oldVal = this.list.get(pos);
        this.model.history.add(new SpeakersListHistory({
            type: SpeakersListHistory.type,
            subtype: SpeakersListHistoryType.REMOVE,
            oldVal: this.list.get(pos),
            pos: pos,
            speaker: null,
            affectLines: this.removeLineSpeakers(oldVal)
        }));
        this.list.splice(pos, 1);
    }

    save(pos:number, speaker:string) {
        const oldVal = this.list.get(pos);
        const isAdd = pos == this.list.length;
        this.model.history.add(new SpeakersListHistory({
            type: SpeakersListHistory.type,
            subtype: isAdd ? SpeakersListHistoryType.ADD : SpeakersListHistoryType.CHANGE,
            oldVal: oldVal,
            pos: pos,
            speaker: speaker,
            affectLines: null,
        }));
        if (isAdd){
            this.list.push(speaker);
        }
        else {
            this.list.pop();
            this.renameLineSpeakers(oldVal, speaker);
        }
    }

    renameLineSpeakers(from:string, to:string) {
        for (var i = 0; i < this.model.lines.length; i++) {
            var line = this.model.lines[i];
            if (line.speaker == from) {
                line.speaker = to;
            }
        }
    }
    removeLineSpeakers(speaker: string) {
        const affectLines:number[] = [];
        for (var i = 0; i < this.model.lines.length; i++) {
            var line = this.model.lines[i];
            if (line.speaker == speaker) {
                line.speaker = null;
                affectLines.push(i);
            }
        }
        return affectLines;
    }

    restoreLineSpeakers(lines: number[], speaker: string) {
        for (var i = 0; i < lines.length; i++) {
            var line = this.model.lines[lines[i]];
            line.speaker = speaker;
        }
    }

}
