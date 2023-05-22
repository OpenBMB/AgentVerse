import FadeIn from '../../../../audio/fade/FadeIn.js';
import FadeOut from '../../../../audio/fade/FadeOut.js';

const RemoveItem = Phaser.Utils.Array.Remove;

export default {

    getSoundEffects() {
        return this.soundEffects;
    },

    getLastSoundEffect() {
        return this.soundEffects[this.soundEffects.length - 1];
    },

    playSoundEffect(key) {
        var soundEffect = this.sound.add(key);
        soundEffect.setVolume(this.soundEffectsVolume);

        this.soundEffects.push(soundEffect);

        soundEffect
            .once('complete', function () {
                soundEffect.destroy();

                // SoundManager has been destroyed
                if (!this.sound) {
                    return;
                }
                RemoveItem(this.soundEffects, soundEffect);
            }, this)
            .once('destroy', function () {
                // SoundManager has been destroyed
                if (!this.sound) {
                    return;
                }
                RemoveItem(this.soundEffects, soundEffect);
            }, this)
            .play();

        return this;
    },

    fadeInSoundEffect(time) {
        var soundEffect = this.getLastSoundEffect();
        if (soundEffect) {
            FadeIn(soundEffect, time, this.soundEffectsVolume, 0);
        }

        return this;
    },

    fadeOutSoundEffect(time, isStopped) {
        var soundEffect = this.getLastSoundEffect();
        if (soundEffect) {
            FadeOut(soundEffect, time, isStopped);
        }

        return this;
    },

    fadeOutAllSoundEffects(time, isStopped) {
        for (var i = this.soundEffects.length - 1; i >= 0; i--) {
            FadeOut(this.soundEffects[i], time, isStopped);
        }

        return this;
    },

    setSoundEffectVolume(volume, lastSoundEffect) {
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        if (lastSoundEffect) {
            // Set volume of last sound effect
            var soundEffect = this.getLastSoundEffect();
            if (soundEffect) {
                soundEffect.setVolume(volume);
            }

        } else {
            // Set volume of all sound effects
            this.soundEffectsVolume = volume;
        }

        return this;
    },

}