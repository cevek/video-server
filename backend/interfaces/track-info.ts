import {MediaType} from "./media-types";
export interface TrackInfo {
    title?: string;
    id?: number;
    lang?: string;
    url?: string;
    type: MediaType;
}