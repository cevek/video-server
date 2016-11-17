export class DisposerItem {
    pos: number;
    bottomSpace = 0;
    power: number;
    realPos: number;
    skip: boolean;

    get top() {
        return this.pos - this.height / 2;
    }

    get bottom() {
        return this.pos + this.height / 2;
    }

    get realHeight() {
        return this.realBottom - this.realTop;
    }

    constructor(public realTop: number, public realBottom: number, top: number, public height: number) {
        this.pos = top + height / 2;
        this.realPos = this.realTop + (this.realBottom - this.realTop) / 2;
        this.power = this.realPos - this.pos;
        this.skip = realTop < 0;
    }
}

interface GG {
    top: number;
    bottom: number;
    height: number;
}


export function disposer(values: GG[]): DisposerItem[] {
    let len = values.length;
    if (len == 0) {
        return [];
    }
    let top = 0;
    const stage: DisposerItem[] = new Array(len);
    for (let i = 0; i < len; i++) {
        let value = values[i];
        stage[i] = new DisposerItem(value.top, value.bottom, top, value.height);
        top += value.height;
    }
    stage[len - 1].bottomSpace = Infinity;
    for (let i = len - 1; i >= 0; i--) {
        let value = stage[i];
        if (value.power <= 0) {
            continue;
        }
        let count = 0;
        let power = 0;
        for (let j = i; j < len; j++) {
            let value = stage[j];
            count++;
            power += value.power;
            const eatSpaceSize = Math.min(value.bottomSpace, Math.ceil(power / count));
            power -= eatSpaceSize * count;
            if (eatSpaceSize != 0) {
                for (let k = j; k >= i; k--) {
                    let value = stage[k];
                    value.bottomSpace -= eatSpaceSize;
                    value.power -= eatSpaceSize;
                    value.pos += eatSpaceSize;
                    if (k > 0) {
                        const nextEl = stage[k - 1];
                        nextEl.bottomSpace += eatSpaceSize;
                    }
                }
            }
            if (power <= 0) {
                break;
            }
        }
    }
    return stage;
}


export function disposerWithGroup(groups: {start: number; end: number}[], values: GG[]) {
    if (values.length == 0) {
        return [];
    }
    const groupValues: GG[] = [];
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        let posSum = 0;
        let heightSum = 0;
        let start: GG;
        let end: GG;
        for (let j = group.start; j <= group.end; j++) {
            let val = values[j];
            if (val.top < 0) {
                continue;
            }
            if (!start) {
                start = val;
            }
            end = val;
            posSum += val.top + (val.bottom - val.top) / 2;
            heightSum += val.height;
        }
        const middle = start.top + (end.bottom - start.top) / 2;//posSum / (group.end - group.start + 1);
        const item = {top: middle - 10, bottom: middle + 10, height: heightSum};
        groupValues.push(item);
    }
    const generated = disposer(groupValues);
    // console.log(generated);

    const newArr: DisposerItem[] = [];
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        let top = generated[i].top;
        for (let j = group.start; j <= group.end; j++) {
            const value = values[j];
            const item = new DisposerItem(value.top, value.bottom, top, value.height);
            top += value.height;
            newArr.push(item);
        }
    }
    return newArr;
}