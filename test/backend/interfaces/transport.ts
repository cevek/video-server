import {Post} from "./post";
import {Line} from "./line";
import {TextLine} from "./text-line";
import {MediaFile} from "./media-file";
export interface IGetPost {
    post: Post;
    lines: Line[],
    textLines: {[id: string]: TextLine}
    mediaFiles: {[id: string]: MediaFile}
}
