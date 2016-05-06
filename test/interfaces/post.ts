export interface Post {
    id?: string;
    title?: string;
    video?: string;
    cover?: number;
    thumbs?: string;
    enAudio: string;
    ruAudio?: string;
    enSub?: string;
    ruSub?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
