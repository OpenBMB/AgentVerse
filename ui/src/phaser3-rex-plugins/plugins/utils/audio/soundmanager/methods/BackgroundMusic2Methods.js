import FadeIn from '../../../../audio/fade/FadeIn.js';
import FadeOut from '../../../../audio/fade/FadeOut.js';

export default {
    setBackgroundMusic2LoopValue(value) {
        this.backgroundMusic2LoopValue = value;
        return this;
    },

    setBackgroundMusic2FadeTime(time) {
        this.backgroundMusic2FadeTime = time;
        return this;
    },

    getBackgroundMusic2() {
        return this.backgroundMusic2;
    },

    // Internal method
    setCurrentBackgroundMusic2(music) {
        this.backgroundMusic2 = music;

        if (music) {
            music.setLoop(this.backgroundMusic2LoopValue);
            music
                .once('complete', function () {
                    if (this.backgroundMusic2 === music) {
                        this.backgroundMusic2.destroy();
                        this.backgroundMusic2 = undefined;
                    }
                }, this)
                .once('destroy', function () {
                    if (this.backgroundMusic2 === music) {
                        this.backgroundMusic2 = undefined;
                    }
                }, this)

            if (!music.isPlaying) {
                music.play();
            }
        }
        return this;
    },

    playBackgroundMusic2(key) {
        // Don't re-play the same background music
        if (this.backgroundMusic2 && (this.backgroundMusic2.key === key)) {
            return this;
        }

        this.stopBackgroundMusic2(); // Stop previous background music

        this.setCurrentBackgroundMusic2(this.sound.add(key));

        if (this.backgroundMusic2FadeTime > 0) {
            this.fadeInBackgroundMusic2(this.backgroundMusic2FadeTime);
        }
        return this;
    },

    pauseBackgroundMusic2() {
        if (this.backgroundMusic2) {
            this.backgroundMusic2.pause();
        }
        return this;
    },

    resumeBackgroundMusic2() {
        if (this.backgroundMusic2) {
            this.backgroundMusic2.resume();
        }
        return this;
    },

    stopBackgroundMusic2() {
        if (this.backgroundMusic2) {
            if (this.backgroundMusic2FadeTime > 0) {
                this.fadeOutBackgroundMusic2(this.backgroundMusic2FadeTime, true);

            } else {
                this.backgroundMusic2.stop();
                this.backgroundMusic2.destroy();
                this.backgroundMusic2 = undefined;
            }
        }
        return this;
    },

    fadeInBackgroundMusic2(time) {
        if (this.backgroundMusic2) {
            FadeIn(this.backgroundMusic2, time, this.backgroundMusic2Volume, 0);
        }

        return this;
    },

    fadeOutBackgroundMusic2(time, isStopped) {
        if (this.backgroundMusic2) {
            FadeOut(this.backgroundMusic2, time, isStopped);
        }

        return this;
    },

    crossFadeBackgroundMusic2(key, time) {
        var backgroundMusic2FadeTimeSave = this.backgroundMusic2FadeTime;
        this.backgroundMusic2FadeTime = 0;

        this
            .fadeOutBackgroundMusic2(time, true)
            .playBackgroundMusic2(key)
            .fadeInBackgroundMusic2(time);

        this.backgroundMusic2FadeTime = backgroundMusic2FadeTimeSave;

        return this;
    },

    setBackgroundMusic2Volume(volume) {
        this.backgroundMusic2Volume = volume;
        return this;
    }

}