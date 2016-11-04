import {EditorHistoryData} from "../utils/history";
import {prop} from "atom-next";
import {AtomArray} from "atom-next";
import {Speaker} from "../models/Speaker";
import {EditorModel} from "../models/Editor/EditorModel";

enum SpeakersListHistoryType{
    ADD = 1,
    CHANGE = 2,
    REMOVE = 3
}

const historySpeakerList = 'speaker-list'

class HistorySpeakersList extends EditorHistoryData<HistorySpeakersList> {
    type = historySpeakerList;
    subtype:SpeakersListHistoryType;
    oldVal:string;
    pos:number;
    speaker:string;
    affectLines:number[];
}

export class EditorSpeakerList {
    @prop list = new AtomArray<Speaker>([]);

    constructor(public model:EditorModel) {
        //todo
        // this.model.history.listen(historySpeakerList, this.onHistory)
    }

    onHistory = (data:HistorySpeakersList, isRedo:boolean) => {
        /*if (data.subtype == SpeakersListHistoryType.ADD) {
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
        }*/
    }

    remove(pos:number) {
        const oldVal = this.list.get(pos);
        /*this.model.history.add(new HistorySpeakersList({
            type: null,
            subtype: SpeakersListHistoryType.REMOVE,
            oldVal: this.list.get(pos),
            pos: pos,
            speaker: null,
            affectLines: this.removeLineSpeakers(oldVal)
        }));*/
        this.list.splice(pos, 1);
    }

    save(pos:number, speaker:Speaker) {
        const oldVal = this.list.get(pos);
        const isAdd = pos == this.list.length;
        /*this.model.history.add(new HistorySpeakersList({
            type: null,
            subtype: isAdd ? SpeakersListHistoryType.ADD : SpeakersListHistoryType.CHANGE,
            oldVal: oldVal,
            pos: pos,
            speaker: speaker,
            affectLines: null,
        }));*/
        if (isAdd) {
            this.list.push(speaker);
        }
        else {
            this.list.set(pos, speaker);
            //todo:
            oldVal.name = speaker.name;
        }
    }

    removeLineSpeakers(speaker:Speaker) {
        const affectLines:number[] = [];
        for (var i = 0; i < this.model.post.lines.length; i++) {
            var line = this.model.post.lines[i];
            if (line.speaker == speaker) {
                line.speaker = null;
                affectLines.push(i);
            }
        }
        return affectLines;
    }

    restoreLineSpeakers(lines:number[], speaker:Speaker) {
        for (var i = 0; i < lines.length; i++) {
            var line = this.model.post.lines[lines[i]];
            line.speaker = speaker;
        }
    }

}
