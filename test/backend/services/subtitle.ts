"use strict";

export class SubRow {
    start:number;
    duration:number;
    text:string;
}

export function parseSubtitles(subtitleText:string) {
    var re = /\d+\s+(-?)(\d{2}):(\d{2}):(\d{2})[,.](\d{3}) --> (-?)(\d{2}):(\d{2}):(\d{2})[,.](\d{3})\s+([\S\s]*?)(?=\d+\s+-?\d{2}:\d{2}:\d{2}|$)/g;
    var res:string[];
    var lines:SubRow[] = [];
    while (res = re.exec(subtitleText)) {
        var start = (res[1] ? -1 : 1) * (+res[2] * 360000 + +res[3] * 6000 + +res[4] * 100 + +res[5] / 10 | 0);
        var end = (res[6] ? -1 : 1) * (+res[7] * 360000 + +res[8] * 6000 + +res[9] * 100 + +res[10] / 10 | 0);
        var duration = end - start;
        var text = res[11].trim();
        lines.push({start, duration, text});
    }
    return lines;
}

export class SubtitleSync {
    private maxDiff = 2;
    private syncLines:SubRow[][] = [];

    constructor(public subs1:SubRow[], public subs2:SubRow[]) {

    }

    merge() {
        var subs1 = this.subs1.slice();
        var subs2 = this.subs2.slice();
        while (subs1.length || subs2.length) {
            var sub1 = subs1[0];
            var sub2 = subs2[0];
            if (sub1 && sub2) {
                if (sub1.start <= sub2.start) {
                    this.push(0, subs1.shift());
                }
                else {
                    this.push(1, subs2.shift());
                }
            }
            else if (sub1) {
                this.push(0, subs1.shift());
            }
            else {
                this.push(1, subs2.shift());
            }
        }
        return this.syncLines;
    }

    private push(n:number, sub:SubRow) {
        var lastLine = this.syncLines[this.syncLines.length - 1];
        var opposite = n == 0 ? 1 : 0;
        if (!lastLine || lastLine[n] || !this.canMerge(sub, lastLine[opposite])) {
            this.syncLines.push(n == 0 ? [sub, null] : [null, sub]);
        }
        else {
            lastLine[n] = sub;
        }
    }

    private canMerge(a:SubRow, b:SubRow) {
        var aEnd = a.start + a.duration;
        var bEnd = b.start + b.duration;
        var minDur = Math.min(a.duration, b.duration);
        var maxDur = Math.max(a.duration, b.duration);
        var top = Math.min(a.start, b.start);
        var bottom = Math.max(aEnd, bEnd);
        var diffDur = bottom - top;
        var diff = diffDur - minDur - maxDur;
        return diff < this.maxDiff;
    }
}