import {Post} from "./post";
import {ILine} from "./line";
import {ITextLine} from "./text-line";
import {MediaFile} from "./media-file";
export interface IGetPost {
    post: Post;
    lines: ILine[];
    textLines: {[id: string]: ITextLine}
    mediaFiles: {[id: string]: MediaFile}
}
