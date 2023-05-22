import GetSoundManager from '../../../utils/system/GetSoundManager.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class SoundManager {
    constructor(game, config) {
        this.sound = GetSoundManager(game);

        // Background music will be (fade out)destroyed when play next one.
        this.backgroundMusic = undefined;
        this._backgroundMusicVolume = GetValue(config, 'bgm.volume', 1);

        this.setBackgroundMusicLoopValue(GetValue(config, 'bgm.loop', true));
        this.setBackgroundMusicFadeTime(GetValue(config, 'bgm.fade', 500));

        this.backgroundMusic2 = undefined;
        this._backgroundMusic2Volume = GetValue(config, 'bgm2.volume', 1);

        this.setBackgroundMusic2LoopValue(GetValue(config, 'bgm2.loop', true));
        this.setBackgroundMusic2FadeTime(GetValue(config, 'bgm2.fade', 500));

        // Sound effect will be destroyed when completed
        this.soundEffects = [];
        this._soundEffectsVolume = GetValue(config, 'soundEffect.volume', 1);

        this.soundEffects2 = [];
        this._soundEffects2Volume = GetValue(config, 'soundEffect2.volume', 1);


        var initialBackgroundMusic = GetValue(config, 'bgm.initial', undefined);
        if (initialBackgroundMusic) {
            this.setCurrentBackgroundMusic(initialBackgroundMusic);
        }

        var initialBackgroundMusic2 = GetValue(config, 'bgm2.initial', undefined);
        if (initialBackgroundMusic2) {
            this.setCurrentBackgroundMusic2(initialBackgroundMusic2);
        }
    }

    destroy() {
        if (this.backgroundMusic) {
            this.backgroundMusic.destroy();
        }
        this.backgroundMusic = undefined;

        if (this.backgroundMusic2) {
            this.backgroundMusic2.destroy();
        }
        this.backgroundMusic2 = undefined;

        if (this.soundEffects.length) {
            for (var i = this.soundEffects.length - 1; i >= 0; i--) {
                this.soundEffects[i].destroy();
            }
        }
        this.soundEffects.length = 0;

        if (this.soundEffects2.length) {
            for (var i = this.soundEffects2.length - 1; i >= 0; i--) {
                this.soundEffects2[i].destroy();
            }
        }
        this.soundEffects2.length = 0;

        this.sound = undefined;

        return this;
    }

    get backgroundMusicVolume() {
        return this._backgroundMusicVolume;
    }

    set backgroundMusicVolume(value) {
        this._backgroundMusicVolume = value;
        if (this.backgroundMusic) {
            this.backgroundMusic.setVolume(value);
        }
    }

    get backgroundMusic2Volume() {
        return this._backgroundMusic2Volume;
    }

    set backgroundMusic2Volume(value) {
        this._backgroundMusic2Volume = value;
        if (this.backgroundMusic2) {
            this.backgroundMusic2.setVolume(value);
        }
    }

    get soundEffectsVolume() {
        return this._soundEffectsVolume;
    }

    set soundEffectsVolume(value) {
        this._soundEffectsVolume = value;
        var soundEffects = this.soundEffects;
        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
            soundEffects[i].setVolume(value);
        }
    }

}

Object.assign(
    SoundManager.prototype,
    Methods
)

export default SoundManager;