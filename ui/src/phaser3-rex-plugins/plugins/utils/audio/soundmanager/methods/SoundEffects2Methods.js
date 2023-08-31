import FadeIn from '../../../../audio/fade/FadeIn.js';
import FadeOut from '../../../../audio/fade/FadeOut.js';

const RemoveItem = Phaser.Utils.Array.Remove;

export default {

    getSoundEffects2() {
        return this.soundEffects2;
    },

    getLastSoundEffect2() {
        return this.soundEffects2[this.soundEffects2.length - 1];
    },

    playSoundEffect2(key) {
        var soundEffect = this.sound.add(key);
        soundEffect.setVolume(this.soundEffects2Volume);

        this.soundEffects2.push(soundEffect);

        soundEffect
            .once('complete', function () {
                soundEffect.destroy();

                // SoundManager has been destroyed
                if (!this.sound) {
                    return;
                }
                RemoveItem(this.soundEffects2, soundEffect);
            }, this)
            .once('destroy', function () {
                // SoundManager has been destroyed
                if (!this.sound) {
                    return;
                }
                RemoveItem(this.soundEffects2, soundEffect);
            }, this)
            .play();

        return this;
    },

    fadeInSoundEffect2(time) {
        var soundEffect = this.getLastSoundEffect2();
        if (soundEffect) {
            FadeIn(soundEffect, time, this.soundEffects2Volume, 0);
        }

        return this;
    },

    fadeOutSoundEffect2(time, isStopped) {
        var soundEffect = this.getLastSoundEffect2();
        if (soundEffect) {
            FadeOut(soundEffect, time, isStopped);
        }

        return this;
    },

    fadeOutAllSoundEffects2(time, isStopped) {
        for (var i = this.soundEffects2.length - 1; i >= 0; i--) {
            FadeOut(this.soundEffects2[i], time, isStopped);
        }

        return this;
    },

    setSoundEffect2Volume(volume, lastSoundEffect) {
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        if (lastSoundEffect) {
            // Set volume of last sound effect
            var soundEffect = this.getLastSoundEffect2();
            if (soundEffect) {
                soundEffect.setVolume(volume);
            }

        } else {
            // Set volume of all sound effects
            this.soundEffects2Volume = volume;
        }

        return this;
    },

}