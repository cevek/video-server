export function generateRandomTimestamps(count = 50) {
    let last:number;
    let ab:number[] = [];
    for (var i = 0; i < count; i++) {
        let item = last + Math.random() * 70 | 0;
        ab.push(item);
        last = item;
    }
    return ab;
}
const debug = true;
// ab = [0, 10, 20, 30, 40, 110, 120, 130, 360, 370, 380, 390, 400, 510, 520, 530, 540, 550, 560, 570, 700, 800, 910, 920, 930]
// ab = [0, 1035, 1056, 1091, 1105, 1119, 1176, 1201, 1218, 1291]
// ab = [0, 100, 200, 200, 200, 200, 200, 200, 200, 200, 200];


export class LineAllocator {
    private render:number[];

    constructor(private timestamps:number[], private secPerPx:number, private lineHeight:number) {

    }

    private moveGroup(start:number, end:number, moveSize:number) {
        for (let j = start; j <= end; j++) {
            const y = this.render[j];
            if (debug) {
                console.log('move', {
                    j,
                    lineTop: this.timestamps[j],
                    lineRender: y,
                    lineAfterRender: y - moveSize
                });
            }
            this.render[j] -= moveSize;
        }
        return moveSize * (end - start + 1);
    }

    private fitToUp(startPos:number) {
        const render = this.render;
        const timestamps = this.timestamps;
        let lastRenderY = render[startPos];
        let groupWeight = lastRenderY - timestamps[startPos];
        let groupSize = 1;
        const groupEndPos = startPos;
        for (let i = startPos - 1; i >= 0; i--) {
            const y = render[i];
            const bottomSpaceSize = (lastRenderY - y) - this.lineHeight;
            // we have a space
            const timestamp = timestamps[i];
            if (bottomSpaceSize > 0) {
                const needSpace = groupWeight / groupSize;
                const isNeedSpaceFit = bottomSpaceSize > needSpace;
                const moveSize = Math.min(needSpace, bottomSpaceSize);
                if (debug) {
                    console.log('found space', {
                        lineTop: timestamp,
                        lineRender: y,
                        i,
                        isNeedSpaceFit,
                        moveSize,
                        groupWeight,
                        groupSize,
                        groupEndPos,
                        bottomSpaceSize,
                        needSpace,
                        lines: JSON.parse(JSON.stringify(render))
                    });
                }

                if (moveSize > 1) {
                    groupWeight -= this.moveGroup(i + 1, groupEndPos, moveSize);
                }

                if (isNeedSpaceFit) {
                    if (debug) {
                        if (groupWeight != 0) {
                            console.error('break', {groupWeight});
                        }
                        else {
                            console.log('break', {groupWeight});
                        }
                    }
                    break;
                }
                else {
                    if (debug) {
                        console.log('end of group', {groupWeight});
                    }
                }

            }
            groupWeight += y - timestamp;
            groupSize++;
            lastRenderY = y;
            if (debug) {
                console.log('iter', {groupWeight, groupSize, lnRY: y, lnY: timestamp});
            }
        }
    }

    allocateRenderLines() {
        const timestamps = this.timestamps;
        this.render = new Array(timestamps.length);
        const render = this.render;
        let lastTop = -Infinity;
        for (let k = 0; k < timestamps.length; k++) {
            render[k] = Math.max(timestamps[k], lastTop + this.lineHeight);
            this.fitToUp(k);
            lastTop = render[k];
            if (debug) {
                console.log('after insert', {k, lastTop});
            }
        }
        return render;
    }

}
