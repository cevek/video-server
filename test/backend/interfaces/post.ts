export interface Post {
    id?: string;
    title: string;
    video?: string;
    enAudio: string;
    ruAudio?: string;
    enSub: string;
    ruSub?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
