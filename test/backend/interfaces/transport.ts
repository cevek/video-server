import {IPosts, ILines, ITextLines, IMediaFiles} from "./db-models";
export interface IGetPost {
    post: IPosts;
    lines: ILines[];
    textLines: {[id: string]: ITextLines}
    mediaFiles: {[id: string]: IMediaFiles}
}
