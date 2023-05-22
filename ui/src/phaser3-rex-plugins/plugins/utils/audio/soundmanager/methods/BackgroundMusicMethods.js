import FadeIn from '../../../../audio/fade/FadeIn.js';
import FadeOut from '../../../../audio/fade/FadeOut.js';

export default {
    setBackgroundMusicLoopValue(value) {
        this.backgroundMusicLoopValue = value;
        return this;
    },

    setBackgroundMusicFadeTime(time) {
        this.backgroundMusicFadeTime = time;
        return this;
    },

    getBackgroundMusic() {
        return this.backgroundMusic;
    },

    // Internal method
    setCurrentBackgroundMusic(music) {
        this.backgroundMusic = music;

        if (music) {
            music.setLoop(this.backgroundMusicLoopValue);
            music
                .once('complete', function () {
                    if (this.backgroundMusic === music) {
                        this.backgroundMusic.destroy();
                        this.backgroundMusic = undefined;
                    }
                }, this)
                .once('destroy', function () {
                    if (this.backgroundMusic === music) {
                        this.backgroundMusic = undefined;
                    }
                }, this)

            if (!music.isPlaying) {
                music.play();
            }
        }
        return this;
    },

    playBackgroundMusic(key) {
        // Don't re-play the same background music
        if (this.backgroundMusic && (this.backgroundMusic.key === key)) {
            return this;
        }

        this.stopBackgroundMusic(); // Stop previous background music

        this.setCurrentBackgroundMusic(this.sound.add(key));

        if (this.backgroundMusicFadeTime > 0) {
            this.fadeInBackgroundMusic(this.backgroundMusicFadeTime);
        }
        return this;
    },

    pauseBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
        return this;
    },

    resumeBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.resume();
        }
        return this;
    },

    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            if (this.backgroundMusicFadeTime > 0) {
                this.fadeOutBackgroundMusic(this.backgroundMusicFadeTime, true);

            } else {
                this.backgroundMusic.stop();
                this.backgroundMusic.destroy();
                this.backgroundMusic = undefined;
            }
        }
        return this;
    },

    fadeInBackgroundMusic(time) {
        if (this.backgroundMusic) {
            FadeIn(this.backgroundMusic, time, this.backgroundMusicVolume, 0);
        }

        return this;
    },

    fadeOutBackgroundMusic(time, isStopped) {
        if (this.backgroundMusic) {
            FadeOut(this.backgroundMusic, time, isStopped);
        }

        return this;
    },

    crossFadeBackgroundMusic(key, time) {
        var backgroundMusicFadeTimeSave = this.backgroundMusicFadeTime;
        this.backgroundMusicFadeTime = 0;

        this
            .fadeOutBackgroundMusic(time, true)
            .playBackgroundMusic(key)
            .fadeInBackgroundMusic(time);

        this.backgroundMusicFadeTime = backgroundMusicFadeTimeSave;

        return this;
    },

    setBackgroundMusicVolume(volume) {
        this.backgroundMusicVolume = volume;
        return this;
    }

}