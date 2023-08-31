import Resize from '../utils/Resize.js';
import LoadAPI from './LoadAPI.js';

const DOMElement = Phaser.GameObjects.DOMElement;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;
const UUID = Phaser.Utils.String.UUID;

class YoutubePlayer extends DOMElement {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 0);
            height = GetValue(config, 'height', 0);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', 0);
            height = GetValue(config, 'height', 0);
        }

        if (config === undefined) {
            config = {};
        }

        super(scene, x, y);
        this.type = 'rexYoutubePlayer';
        this.youtubePlayer = undefined;
        this.videoState = undefined;
        this.videoId = GetValue(config, 'videoId', '');
        this.loop = GetValue(config, 'loop', false);
        this.paddingCallbacks = [];

        // Create DIV element and add it
        var elementId = `YT${UUID()}`;
        var element = document.createElement('div');
        element.id = elementId;
        this.setElement(element);
        this.resize(width, height);

        // Create youtube player iframe when API ready
        var playerVars = {
            autoplay: GetValue(config, 'autoPlay', true) ? 1 : 0,
            controls: GetValue(config, 'controls', true) ? 1 : 0,
            disablekb: !GetValue(config, 'keyboardControl', true) ? 1 : 0,
            modestbranding: GetValue(config, 'modestBranding', false) ? 1 : 0,
        };
        var onLoad = (function () {
            var youtubePlayer = new YT.Player(
                elementId,
                {
                    'videoId': this.videoId,
                    'playerVars': playerVars,
                    'events': {
                        'onStateChange': (function (event) {
                            this.videoState = event.data;

                            this.emit('statechange', this);
                            this.emit(this.videoStateString, this);

                            if ((this.videoState === YT.PlayerState.ENDED) && this.loop) {
                                this.youtubePlayer.playVideo();
                            }
                        }).bind(this),
                        'onReady': (function (event) {
                            this.youtubePlayer = youtubePlayer;
                            for (var i = 0, cnt = this.paddingCallbacks.length; i < cnt; i++) {
                                this.paddingCallbacks[i]();
                            }
                            this.paddingCallbacks = undefined;
                            this.emit('ready', this);
                        }).bind(this),
                        'onError': (function (event) {
                            this.lastError = event.data;
                            this.emit('error', this, this.lastError);
                        }).bind(this),
                    }
                }
            );
            this.setElement(document.getElementById(elementId)); // Also remove previous DIV element
        }).bind(this);
        LoadAPI(onLoad);
    }

    _runCallback(callback) {
        if (this.youtubePlayer === undefined) {
            this.paddingCallbacks.push(callback);
        } else {
            callback();
        }
    }

    get videoStateString() {
        if ((this.videoState === undefined) || (!YT)) {
            return '';
        } else {
            switch (this.videoState) {
                case -1: return "unstarted";
                case YT.PlayerState.ENDED: return "ended";
                case YT.PlayerState.PLAYING: return "playing";
                case YT.PlayerState.PAUSED: return "pause";
                case YT.PlayerState.BUFFERING: return "buffering";
                case YT.PlayerState.CUED: return "cued";
            }
        }
    }

    load(videoId, autoPlay) {
        if (autoPlay === undefined) {
            autoPlay = true;
        }

        var callback = (function () {
            this.youtubePlayer.loadVideoById(videoId);
            if (autoPlay) {
                this.youtubePlayer.playVideo();
            } else {
                this.youtubePlayer.pauseVideo();
            }
        }).bind(this);

        this._runCallback(callback);
        return this;
    }

    play() {
        var callback = (function () {
            this.youtubePlayer.playVideo();
        }).bind(this);

        this._runCallback(callback);
        return this;
    }

    get isPlaying() {
        return (this.videoState === 1); // YT.PlayerState.PLAYING
    }

    pause() {
        var callback = (function () {
            this.youtubePlayer.pauseVideo();
        }).bind(this);

        this._runCallback(callback);
        return this;
    }

    get isPaused() {
        return (this.videoState === 2); // YT.PlayerState.PAUSED
    }

    get playbackTime() {
        return (this.youtubePlayer) ? this.youtubePlayer.getCurrentTime() : 0;
    }

    set playbackTime(value) {
        var callback = (function () {
            this.youtubePlayer.seekTo(value);
        }).bind(this);

        this._runCallback(callback);
    }

    setPlaybackTime(time) {
        this.playbackTime = time;
        return this;
    }

    get duration() {
        return (this.youtubePlayer) ? this.youtubePlayer.getDuration() : 0;
    }

    get t() {
        var duration = this.duration;
        return (duration === 0) ? 0 : this.playbackTime / duration;
    }

    set t(value) {
        var callback = (function () {
            value = Clamp(value, 0, 1);
            this.playbackTime = this.duration * Clamp(value, 0, 1);
        }).bind(this);

        this._runCallback(callback);
    }

    setT(value) {
        this.t = value;
        return this;
    }

    get hasEnded() {
        return (this.videoState === 0); // YT.PlayerState.ENDED
    }

    get volume() {
        return (this.youtubePlayer) ? (this.youtubePlayer.getVolume() / 100) : 0;
    }

    set volume(value) {
        var callback = (function () {
            this.youtubePlayer.setVolume(Clamp(value * 100, 0, 100));
        }).bind(this);

        this._runCallback(callback);
    }

    setVolume(value) {
        this.volume = value;
        return this;
    }

    get muted() {
        return (this.youtubePlayer) ? this.youtubePlayer.isMuted() : false;
    }

    set muted(value) {
        var callback = (function () {
            if (value) {
                this.youtubePlayer.mute();
            } else {
                this.youtubePlayer.unMute();
            }
        }).bind(this);

        this._runCallback(callback);
    }

    setMute(value) {
        if (value === undefined) {
            value = true;
        }
        this.muted = value;
        return this;
    }

    setLoop(value) {
        if (value === undefined) {
            value = true;
        }
        this.loop = value;
        return this;
    }
}

var methods = {
    resize: Resize
}

Object.assign(
    YoutubePlayer.prototype,
    methods
);

export default YoutubePlayer;