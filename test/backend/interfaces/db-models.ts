interface Field<T>{}


export interface ILines {
    id: number
    postId: number
    en: number
    ru: number
    speaker: string
    seq: number
}
export interface ILinesFields {
    id: Field<number>
    postId: Field<number>
    en: Field<number>
    ru: Field<number>
    speaker: Field<string>
    seq: Field<number>
}
export type ILinesFieldNames = "id" | "postId" | "en" | "ru" | "speaker" | "seq"


export interface IMediaFiles {
    id: number
    type: number
    uploadId: number
    filename: string
    createdAt: Date
    info: string
    startTime: number
    shiftTime: number
    duration: number
    url: string
    videoFile: number
}
export interface IMediaFilesFields {
    id: Field<number>
    type: Field<number>
    uploadId: Field<number>
    filename: Field<string>
    createdAt: Field<Date>
    info: Field<string>
    startTime: Field<number>
    shiftTime: Field<number>
    duration: Field<number>
    url: Field<string>
    videoFile: Field<number>
}
export type IMediaFilesFieldNames = "id" | "type" | "uploadId" | "filename" | "createdAt" | "info" | "startTime" | "shiftTime" | "duration" | "url" | "videoFile"


export interface IPosts {
    id: number
    title: string
    ruAudio: number
    enAudio: number
    ruSub: number
    enSub: number
    video: number
    thumbs: number
    createdAt: Date
}
export interface IPostsFields {
    id: Field<number>
    title: Field<string>
    ruAudio: Field<number>
    enAudio: Field<number>
    ruSub: Field<number>
    enSub: Field<number>
    video: Field<number>
    thumbs: Field<number>
    createdAt: Field<Date>
}
export type IPostsFieldNames = "id" | "title" | "ruAudio" | "enAudio" | "ruSub" | "enSub" | "video" | "thumbs" | "createdAt"


export interface ITextLines {
    id: number
    lang: number
    start: number
    dur: number
    text: string
    lineId: number
    postId: number
}
export interface ITextLinesFields {
    id: Field<number>
    lang: Field<number>
    start: Field<number>
    dur: Field<number>
    text: Field<string>
    lineId: Field<number>
    postId: Field<number>
}
export type ITextLinesFieldNames = "id" | "lang" | "start" | "dur" | "text" | "lineId" | "postId"


export interface IUploads {
    id: number
    info: string
    createdAt: Date
}
export interface IUploadsFields {
    id: Field<number>
    info: Field<string>
    createdAt: Field<Date>
}
export type IUploadsFieldNames = "id" | "info" | "createdAt"


export interface IUserTexts {
    id: number
}
export interface IUserTextsFields {
    id: Field<number>
}
export type IUserTextsFieldNames = "id"
