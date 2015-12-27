import {Post} from "./post";
import {Line} from "./line";
import {TextLine} from "./text-line";
export interface IGetPost {
    post: Post;
    lines: Line[],
    textLines: {[id: string]: TextLine}
}
