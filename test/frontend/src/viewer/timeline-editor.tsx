import * as React from "react";
import {AudioSelection} from "./audio-selection";
import {config} from "../../../backend/config";
import {AudioPlayer} from "../utils/audio-player";
import {PostModel} from "../models/post";
import  * as style from "./timeline-editor.css";

export class TimelineEditor extends React.Component<{postModel: PostModel; player: AudioPlayer; resizeKoef: number;}, {}> {

}
