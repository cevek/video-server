import {MediaType} from "./MediaTypes";
export interface TrackInfo {
    title?: string;
    id?: number;
    lang?: string;
    url?: string;
    type: MediaType;
}