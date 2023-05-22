import CreateVideoElement from './CreateVideoElement.js';
import Load from './Load.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

var VideoBase = function (GOClass) {
    return class Base extends GOClass {
        createVideoElement(config) {
            if (!this.video) {
                if (config === undefined) {
                    config = {};
                }
                config.eventEmitter = this;
                this.video = CreateVideoElement(config);
                this.playbackTimeChangeEventEnable = GetValue(config, 'playbackTimeChangeEventEnable', true);
            }
            return this.video;
        }

        preDestroy() {
            if (this.video) {
                this.video.pause();
                this.video.removeAttribute('src'); // empty source
                this.video.load();
                this.video = undefined;
            }
            if (super.preDestroy) {
                super.preDestroy();
            }
        }

        preUpdate(time, delta) {
            if (this.playbackTimeChangeEventEnable) {
                var curT = this.playbackTime;
                if (curT !== this.prevT) {
                    this.emit('playbacktimechange', this);
                }
                this.prevT = curT;
            }
            if (super.preUpdate) {
                super.preUpdate(time, delta);
            }
        }

        get availableVideoTypes() {
            return this.scene.sys.game.device.video;
        }

        load(src) {
            if (this.video) {
                Load(this.video, src, this.availableVideoTypes);
            }
            return this;
        }

        play() {
            if (this.video) {
                this.video.play();
            }
            return this;
        }

        get isPlaying() {
            if (this.video) {
                var video = this.video;
                return (!video.paused) && (!video.ended) && (video.currentTime > 0);
            } else {
                return false;
            }
        }

        pause() {
            if (this.video) {
                this.video.pause();
            }
            return this;
        }

        get isPaused() {
            if (this.video) {
                return this.video.paused;
            } else {
                return false;
            }
        }

        get playbackTime() {
            if (this.video) {
                return this.video.currentTime || 0;
            } else {
                return 0;
            }
        }

        set playbackTime(value) {
            if (this.video) {
                try {
                    this.video.currentTime = value;
                } catch (e) {
                }
            }
        }

        setPlaybackTime(time) {
            this.playbackTime = time;
            return this;
        }

        get duration() {
            if (this.video) {
                return this.video.duration || 0;
            } else {
                return 0;
            }
        }

        get t() {
            if (this.video) {
                var duration = this.duration;
                return (duration === 0) ? 0 : this.playbackTime / duration;
            } else {
                return 0;
            }
        }

        set t(value) {
            if (this.video) {
                this.playbackTime = this.duration * Clamp(value, 0, 1);
            }
        }

        setT(value) {
            this.t = value;
            return this;
        }

        get hasEnded() {
            if (this.video) {
                return this.video.ended;
            } else {
                return false;
            }
        }

        get volume() {
            if (this.video) {
                return this.video.volume || 0;
            } else {
                return 0;
            }
        }

        set volume(value) {
            if (this.video) {
                this.video.volume = value;
            }
        }

        setVolume(value) {
            this.volume = value;
            return this;
        }

        get muted() {
            if (this.video) {
                return this.video.muted || false;
            } else {
                return false;
            }
        }

        set muted(value) {
            if (this.video) {
                this.video.muted = value;
            }
        }

        setMute(value) {
            if (value === undefined) {
                value = true;
            }
            this.muted = value;
            return this;
        }

        get loop() {
            if (this.video) {
                return this.video.loop;
            } else {
                return false;
            }
        }

        set loop(value) {
            if (this.video) {
                this.video.loop = value;
            }
        }

        setLoop(value) {
            if (value === undefined) {
                value = true;
            }
            this.loop = value;
            return this;
        }

        get readyState() {
            if (this.video) {
                return this.video.readyState;
            } else {
                return undefined;
            }
        }
    }
};

export default VideoBase;