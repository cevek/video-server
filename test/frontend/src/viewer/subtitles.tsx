import './subtitles.css';
import * as React from 'react';
import * as classNames from 'classnames';
import {LineAllocator, generateRandomTimestamps} from "../utils/time-allocate";

class Line {
    y:number;
    renderY:number;

}
const lineH = 30;
const height = 1;
const debug = false;
export class Subtitles extends React.Component<{}, {}> {
    lines:Line[] = [];

    render() {
        const timestamps = generateRandomTimestamps();
        // const timestamps = [0, 10, 20, 30, 40, 110, 120, 130, 360, 370, 380, 390, 400, 510, 520, 530, 540, 550, 560, 570, 700, 800, 910, 920, 930]
        // const timestamps = [0, 360, 370]


        const lines = new LineAllocator(timestamps, 30).allocateRenderLines();
        return <div>
            <svg></svg>
            <div className="">
                {lines.map((line,i) =>
                <div className="ln-real" style={{top: timestamps[i]}}>{timestamps[i]}</div>
                    )}

                {lines.map((line,i) =>
                <div className="ln" style={{top: line}}>{timestamps[i]}</div>
                    )}
            </div>
        </div>;
    }
}
