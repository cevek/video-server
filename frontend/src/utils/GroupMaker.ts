import {prop, AtomArray} from "atom-next";
import {assert} from "./assert";

export class Group {
    @prop pos: number;
    @prop start: number;
    @prop end: number;
}

export class GroupList {
    @prop groups = new AtomArray<Group>();

    split(groupPos: number, linePos: number) {
        const group = this.groups.get(groupPos);
        assert(group, 'Incorrect groupPos');
        assert(group.start + linePos < group.end, 'Incorrect linePos');
        let newGroup = new Group();
        newGroup.pos = groupPos;
        newGroup.end = group.end;
        group.end = group.start + linePos;
        newGroup.start = group.end + 1;
        this.groups.splice(groupPos + 1, 0, newGroup);
        for (let i = groupPos + 1; i < this.groups.length; i++) {
            const group = this.groups.get(i);
            group.pos++;
        }
    }

    joinWithNext(groupPos: number) {
        const group = this.groups.get(groupPos)
        assert(group, 'Incorrect groupPos');
        const nextGroup = this.groups.get(groupPos + 1);
        group.end = nextGroup.end;
        this.groups.splice(groupPos + 1, 1);
        for (let i = groupPos; i < this.groups.length; i++) {
            const group = this.groups.get(i);
            group.pos--;
        }
    }

    static generateFromLines(lines: number[], splitDuration: number) {
        if (lines.length == 0) {
            return new GroupList();
        }
        let groups = new AtomArray<Group>();
        let group = new Group();
        group.pos = 0;
        groups.push(group);
        group.start = 0;
        if (lines.length > 0) {
            let prevLine = lines[0];
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i];
                if (line - prevLine > splitDuration) {
                    group.end = i - 1;
                    group = new Group();
                    group.pos = groups.length;
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

    findGroupByLinePos(linePos: number) {
        for (let i = 0; i < this.groups.length; i++) {
            const group = this.groups.get(i);
            if (group.start <= linePos && group.end >= linePos) {
                return group;
            }
        }
        return null;
    }

    appendLine(group: Group) {
        group.end++;
        for (let i = group.pos + 1; i < this.groups.length; i++) {
            const group = this.groups.get(i);
            group.start += 1;
            group.end += 1;
        }
    }
}
