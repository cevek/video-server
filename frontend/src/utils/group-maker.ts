import {Line} from "../models/Line";
import {prop} from "atom-next";
import {assert} from "./assert";
import {AtomArray} from "atom-next";

export class Group {
    start: number;
    end: number;
}

export class GroupList {
    @prop groups = new AtomArray<Group>();

    split(groupPos: number, linePos: number) {
        const group = this.groups.get(groupPos);
        assert(group, 'Incorrect groupPos');
        assert(group.start + linePos < group.end, 'Incorrect linePos');
        let newGroup = new Group();
        newGroup.end = group.end;
        group.end = group.start + linePos;
        newGroup.start = group.end + 1;
        this.groups.splice(groupPos + 1, 0, newGroup);
    }

    joinWithNext(groupPos: number) {
        const group = this.groups.get(groupPos)
        assert(group, 'Incorrect groupPos');
        const nextGroup = this.groups.get(groupPos + 1);
        group.end = nextGroup.end;
        this.groups.splice(groupPos + 1, 1);
        console.log(this.groups);

    }

    static generateFromLines(lines: Line[], splitDuration: number) {
        if (lines.length == 0) {
            return new GroupList();
        }
        let groups = new AtomArray<Group>();
        let group = new Group();
        groups.push(group);
        group.start = 0;
        if (lines.length > 0) {
            let prevLine = lines[0];
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i];
                if (line.en.start - prevLine.en.start > splitDuration) {
                    group.end = i - 1;
                    group = new Group();
                    groups.push(group);
                    group.start = i;
                }
                prevLine = line;
            }
        }
        group.end = lines.length - 1;

        const groupList = new GroupList();
        groupList.groups = groups;
        return groupList;
    }
}
