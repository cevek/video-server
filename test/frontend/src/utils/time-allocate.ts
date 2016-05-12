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
const debug = false;
// ab = [0, 10, 20, 30, 40, 110, 120, 130, 360, 370, 380, 390, 400, 510, 520, 530, 540, 550, 560, 570, 700, 800, 910, 920, 930]
// ab = [0, 1035, 1056, 1091, 1105, 1119, 1176, 1201, 1218, 1291]
// ab = [0, 100, 200, 200, 200, 200, 200, 200, 200, 200, 200];


export class LineAllocator {
    private render:number[];

    constructor(private positions:number[], private lineHeight:number) {
        for (let i = 1; i < positions.length; i++) {
            const val = positions[i];
            const prev = positions[i - 1];
            if (val <= prev) {
                positions[i] = prev;
            }
        }
    }

    private moveGroup(start:number, end:number, moveSize:number) {
        for (let j = start; j <= end; j++) {
            const renderY = this.render[j];
            if (debug) {
                console.log('move', {
                    j,
                    lineTop: this.positions[j],
                    lineRender: renderY,
                    lineAfterRender: renderY - moveSize
                });
            }
            this.render[j] -= moveSize;
        }
        return moveSize * (end - start + 1);
    }

    private fitToUp(startPos:number) {
        let lastRenderY = this.render[startPos];
        let groupWeight = lastRenderY - this.positions[startPos];
        let groupSize = 1;
        const groupEndPos = startPos;
        for (let i = startPos - 1; i >= 0; i--) {
            const y = this.positions[i];
            if (debug) {
                console.log('fitToUp iter', i, y);
            }
            const renderY = this.render[i];
            const bottomSpaceSize = (lastRenderY - renderY) - this.lineHeight;
            // we have a space
            if (bottomSpaceSize > 0) {
                const needSpace = groupWeight / groupSize;
                const isNeedSpaceFit = bottomSpaceSize > needSpace;
                const moveSize = Math.min(needSpace, bottomSpaceSize);
                if (debug) {
                    console.log('found space', {
                        lineTop: y,
                        lineRender: renderY,
                        i,
                        isNeedSpaceFit,
                        moveSize,
                        groupWeight,
                        groupSize,
                        groupEndPos,
                        bottomSpaceSize,
                        needSpace,
                        lines: this.render.slice()
                    });
                }

                if (moveSize > 1) {
                    groupWeight -= this.moveGroup(i + 1, groupEndPos, moveSize);
                }

                if (isNeedSpaceFit) {
                    if (Math.abs(groupWeight) > 50) {
                        console.error('break', {groupWeight});
                    }
                    if (debug) {
                        if (groupWeight != 0) {
                            // console.error('break', {groupWeight});
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
            groupWeight += renderY - y;
            groupSize++;
            lastRenderY = renderY;
            if (debug) {
                console.log('iter', {groupWeight, groupSize, lnRY: renderY, lnY: y});
            }
        }
    }

    allocateRenderLines() {
        this.render = new Array(this.positions.length);
        let lastTop = -Infinity;
        for (let k = 0; k < this.positions.length; k++) {
            this.render[k] = Math.max(this.positions[k], lastTop + this.lineHeight);
            this.fitToUp(k);
            lastTop = this.render[k];
            if (debug) {
                console.log('after insert', {k, lastTop});
            }
        }
        return this.render;
    }

}

