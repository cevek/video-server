import {MediaType} from "./interfaces/media-types";
export interface Stream {
    n: number;
    type: MediaType;
    format?:string;
    aid?: number;
    size?: {w:number; h:number};
    lang?: string;
    title?: string;
    channels?: number;
}
export interface MediaInfo {
    duration: number;
    streams: Stream[];
}

export function mediaInfo(stdout:string) {
    if (!stdout.match(/Stream mapping:/)) {
        return null;
    }
    var res = stdout.match(/Duration: (\d+):(\d+):(\d+)/) || [0, 0, 0, 0];
    var duration = +res[1] * 3600 + +res[2] * 60 + +res[3];
    var track:MediaInfo = {streams: [], duration: duration};
    var streams:string[] = stdout.match(/Stream \#.*\n(\s+Metadata:\n(\s{5,}.*\n)*)?/g) || [];
    for (var i = 0; i < streams.length; i++) {
        var m:string[] = streams[i].replace(/\r?\n/g, '∆').replace(/\s+/g, ' ').match(/Stream \#0.(\d+)(\((.*?)\))?: ((Video): (.*?), .*?, (\d+x\d+)|(Audio): (.*?), .*?, (.*?), (.*? title : (.*?)∆)?|(Subtitle): (.*? title : (.*?)∆)?)/) || [];
        var k = +m[1];
        if (!track.streams[k]) {
            if (m[5]) {
                var m2 = (m[7] || '').match(/(\d+)x(\d+)/);
                var size = {w: +m2[1], h: +m2[2]};
                track.streams[k] = {
                    n: k,
                    type: MediaType.VIDEO,
                    format: m[6] || '',
                    size: size,
                };
            }
            if (m[8]) {
                var channels = (m[10].match(/5.1/) ? 6 : (m[10].match(/mono/) ? 1 : 2) );
                track.streams[k] = {
                    n: k,
                    type: MediaType.AUDIO,
                    lang: m[3] || '',
                    format: m[9] || '',
                    channels: channels,
                    title: (m[12] || '').split(' : ').shift()
                };
            }
            if (m[13]) {
                track.streams[k] = {
                    n: k,
                    type: MediaType.SUBS,
                    lang: m[3] || '',
                    title: (m[15] || '').split(' : ').shift(),
                };
            }
        }
    }
    var aid = 0;
    for (var i = 0; i < track.streams.length; i++) {
        if (track.streams[i].type == MediaType.AUDIO) {
            track.streams[i].aid = aid;
            aid++;
        }
    }

    return track.streams.length ? track : null;
}