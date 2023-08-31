export default YoutubePlayer;

declare namespace YoutubePlayer {

    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,

        videoId?: string,
        autoPlay?: boolean,
        controls?: boolean,
        keyboardControl?: boolean,
        modestBranding?: boolean,
        loop?: boolean,
    }

    namespace Events {
        type PlayingCallbackType = (player: YoutubePlayer) => void;
        type PauseCallbackType = (player: YoutubePlayer) => void;
        type EndedCallbackType = (player: YoutubePlayer) => void;
        type BufferingCallbackType = (player: YoutubePlayer) => void;
        type CuedCallbackType = (player: YoutubePlayer) => void;
        type ErrorCallbackType = (player: YoutubePlayer) => void;
    }
}

declare class YoutubePlayer extends Phaser.GameObjects.DOMElement {
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: YoutubePlayer.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: YoutubePlayer.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: YoutubePlayer.IConfig
    );

    load(
        videoId: string,
        autoPlay?: boolean
    ): this;

    play(): this;
    pause(): this;

    setPlaybackTime(time: number): this;
    playbackTime: number;

    setT(t: number): this;
    t: number;

    readonly duration: number;

    setVolume(volume: number): this;
    volume: number;

    setMute(muted?: boolean): this;
    muted: boolean;

    setLoop(loop?: boolean): this;
    loop: boolean;

    resize(width: number, height: number): this;

    readonly isPlaying: boolean;
    readonly isPaused: boolean;
    readonly hasEnded: boolean;
    readonly videoState: number;
    readonly videoStateString: string;

}