import {ITextLines, IPosts, IMediaFiles, ILines, IUploads, IUserTexts, ISpeakers} from "./interfaces/db-models";
import {BaseModel} from "./models/base";
export class LinesDAO extends BaseModel<ILines> {
    table = 'line'
}
export class SpeakersDAO extends BaseModel<ISpeakers> {
    table = 'speaker'
}

export class MediaFilesDAO extends BaseModel<IMediaFiles> {
    table = 'mediaFile'
}

export class PostsDAO extends BaseModel<IPosts> {
    table = 'post'
}

export class TextLinesDAO extends BaseModel<ITextLines> {
    table = 'textLine'
}

export class UploadsDAO extends BaseModel<IUploads> {
    table = 'upload'
}

export class UserTextsDAO extends BaseModel<IUserTexts> {
    table = 'userText'
}
