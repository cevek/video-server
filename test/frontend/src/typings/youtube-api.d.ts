declare var YT:{
    Player: new (name:any, params:any)=>YTPlayer;
    PlayerState: typeof PlayerState;
};
interface YTPlayer {
    playVideo():void;
    pauseVideo():void;
    stopVideo():void;
    clearVideo():void;
    nextVideo():void;
    previousVideo():void;
    playVideoAt(index:number):void;

    setVolume(volume:number):void;
    getVolume():number;
    mute():void;
    unMute():void;
    isMuted():boolean;

    setSize(width:number, height:number):void;

    getPlaybackRate():number;
    setPlaybackRate(suggestedRate:number):void;
    getAvailablePlaybackRates():number[];

    setLoop(loopPlaylists:boolean):void;
    setShuffle(shufflePlaylist:boolean):void;

    getVideoLoadedFraction():number;
    getPlayerState():PlayerState;
    getCurrentTime():number;

    getPlaybackQuality():quality;
    setPlaybackQuality(suggestedQuality:quality|'default'):void;
    getAvailableQualityLevels():quality[];

    getDuration():number;
    getVideoUrl():string;
    getVideoEmbedCode():string;
    getPlaylist():string[];
    getPlaylistIndex():number;

    addEventListener(event:string, listener:string):void;
    removeEventListener(event:string, listener:string):void
    getIframe():HTMLElement;
    destroy():void;

    seekTo(seconds:number, allowSeekAhead:boolean):void;
}

type quality = 'small' | 'medium' | 'large' | 'hd720' | 'hd1080' | 'highres';

declare enum PlayerState{
    ENDED,
    PLAYING,
    PAUSED,
    BUFFERING,
    CUED
}
