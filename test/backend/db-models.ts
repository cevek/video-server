import {ITextLines, IPosts, IMediaFiles, ILines, IUploads, IUserTexts} from "./interfaces/db-models";
import {BaseModel} from "./models/base";
export class LinesDAO extends BaseModel<ILines> {
    table = 'lines'
}

export class MediaFilesDAO extends BaseModel<IMediaFiles> {
    table = 'mediaFiles'
}

export class PostsDAO extends BaseModel<IPosts> {
    table = 'posts'
}

export class TextLinesDAO extends BaseModel<ITextLines> {
    table = 'textLines'
}

export class UploadsDAO extends BaseModel<IUploads> {
    table = 'uploads'
}

export class UserTextsDAO extends BaseModel<IUserTexts> {
    table = 'userTexts'
}
