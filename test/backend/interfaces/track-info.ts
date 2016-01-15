import {MediaType} from "./media-types";
export interface TrackInfo {
    title?: string;
    id?: string;
    lang?: string;
    url?: string;
    type: MediaType;
}