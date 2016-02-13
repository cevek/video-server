import './subtitles.css';
import * as React from 'react';
import * as classNames from 'classnames';

class Line {
    y:number;
    renderY:number;

}
const lineH = 30;
const height = 1;
const debug = false;
export class Subtitles extends React.Component<{}, {}> {
    lines:Line[] = [];

    calc() {
        const ab = [0, 10, 20, 30, 40, 110, 120, 130, 360, 370, 380, 390, 400, 510, 520, 530, 540, 550, 560, 570, 700, 800, 910, 920, 930]
        const lines = this.lines;
        let lastTop = -Infinity;
        for (let k = 0; k < ab.length; k++) {
            const line = new Line();
            line.y = ab[k];
            line.renderY = Math.max(line.y, lastTop + lineH);
            lines.push(line);

            let lastLine = lines[lines.length - 1];
            let groupSum = lastLine.renderY - lastLine.y;
            let groupSize = 1;
            let groupStart = lines.length - 1;
            for (let i = lines.length - 2; i >= 0; i--) {
                let line = lines[i];
                const bottomSpaceSize = lastLine.renderY - line.renderY;
                // we have a space
                if (bottomSpaceSize > lineH) {
                    const needSpace = groupSum / groupSize;
                    const isNeedSpaceFit = bottomSpaceSize > needSpace;
                    const moveSize = Math.min(needSpace, bottomSpaceSize);
                    if (debug) {
                        console.log('found space', {
                            lineTop: line.y,
                            lineRender: line.renderY,
                            i,
                            isNeedSpaceFit,
                            moveSize,
                            groupSum,
                            groupSize,
                            groupStart,
                            bottomSpaceSize,
                            needSpace,
                            lines: JSON.parse(JSON.stringify(lines))
                        });
                    }

                    for (let j = i + 1; j <= groupStart; j++) {
                        const line = lines[j];
                        if (debug) {
                            console.log('move', {
                                j,
                                lineTop: line.y,
                                lineRender: line.renderY,
                                lineAfterRender: line.renderY - moveSize
                            });
                        }
                        line.renderY -= moveSize;
                    }
                    groupSum -= moveSize;

                    if (isNeedSpaceFit) {
                        break;
                    }
                }
                groupSum += line.renderY - line.y;
                groupSize++;
                lastLine = line;
                if (debug) {
                    console.log('iter', {groupSum, groupSize});
                }
            }
            if (debug) {
                console.log('after insert', k);
            }

            this.forceUpdate();

            lastTop = line.renderY;
        }

        /*
         let lastLine:Line;
         const last = lines[lines.length - 1];
         let groupSum = last.renderTop - last.top;
         let groupStart = lines.length - 1;
         for (let i = lines.length - 1; i >= 0; i--) {
         let line = lines[i];
         if (lastLine) {
         const bottomSpaceSize = lastLine.renderTop - line.renderTop;
         // we have a space
         // console.log({bottomSpaceSize});
         if (bottomSpaceSize > lineH) {
         const needSpace = groupSum / 2 | 0;
         const isNeedSpaceFit = bottomSpaceSize > needSpace;
         const moveSize = Math.min(needSpace, bottomSpaceSize);

         console.log('found space', {
         line,
         i,
         isNeedSpaceFit,
         moveSize,
         groupSum,
         groupStart,
         bottomSpaceSize,
         needSpace
         });

         for (let j = i + 1; j <= groupStart; j++) {
         console.log('move', {j, line: lines[j]});
         lines[j].renderTop -= moveSize;
         }
         groupSum -= moveSize;

         if (isNeedSpaceFit) {
         groupSum = line.renderTop - line.top;
         groupStart = i;
         }
         }
         }
         lastLine = line;
         }
         console.log(lines);*/

        return lines;
    }

    render() {
        const lines = this.lines;
        return <div>
            <button className="render" onClick={()=>this.calc()}>Calc</button>
            <svg></svg>
            <div className="">
                {lines.map(line =>
                <div className="ln-real" style={{top: line.y}}>{line.y}</div>
                    )}

                {lines.map(line =>
                <div className="ln" style={{top: line.renderY}}>{line.y}</div>
                    )}
            </div>
        </div>;
    }
}
