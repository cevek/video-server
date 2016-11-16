export class LineCalc {
    constructor(public resizeKoef: number) {

    }

    timeToPx(time: number) {
        return time * 100 / this.resizeKoef;
    }

    pxToTime(px: number) {
        return px * this.resizeKoef / 100;
    }
}
