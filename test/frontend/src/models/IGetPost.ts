import {IPosts, ILines, ITextLines, IMediaFiles, ISpeakers} from "./db-models";
export interface IGetPost {
    post: IPosts;
    lines: ILines[];
    speakers: {[id: string]: ISpeakers}
    textLines: {[id: string]: ITextLines}
    mediaFiles: {[id: string]: IMediaFiles}
}
