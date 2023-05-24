import { Howl, Howler } from 'howler';
import HowlerSound from './HowlerSound.js';
import IsFunction from '../../object/IsFunction.js';
import GetValue from '../../object/GetValue.js';

class HowlerSoundManager {
    constructor(config) {
        this.defaultConfig = {
            html5: GetValue(config, 'html5', false),
            xhr: GetValue(config, 'xhr', null),
        }

        this.soundBuffers = {};
    }

    load(key, src, config, onLoaded, onLoadError) {
        if (IsFunction(config)) {
            onLoadError = onLoaded;
            onLoaded = config;
            config = undefined;
        }


        if (this.exists(key)) {
            this.unload(key);
        }

        if (config === undefined) {
            config = Object.assign({}, this.defaultConfig)
        } else {
            config = Object.assign({}, this.defaultConfig, config)
        }

        config.src = src;

        var sound = new Howl(config);
        this.soundBuffers[key] = sound;

        if (onLoaded) {
            sound.once('load', onLoaded);
        }
        if (onLoadError) {
            sound.once('loaderror', onLoadError);
        }

        return this;
    }

    unload(key) {
        if (!this.exists(key)) {
            return this;
        }

        this.soundBuffers[key].unload();
        delete this.soundBuffers;

        return this;
    }

    exists(key) {
        return this.soundBuffers.hasOwnProperty(key);
    }

    has(key) {
        return this.soundBuffers.hasOwnProperty(key);
    }

    get(key) {
        return this.soundBuffers[key];
    }

    play(key, oneShot) {
        if (oneShot === undefined) {
            oneShot = false;
        }
        if (!this.exists(key)) {
            return null;
        }

        if (oneShot) {
            return this.get(key).play();
        } else {
            return new HowlerSound(this, key)
        }
    }

    setVolume(volume) {
        Howler.volume(volume);
        return this;
    }

    mute() {
        Howler.mute(true);
        return this;
    }

    unMute() {
        Howler.mute(false);
        return this;
    }

    stop() {
        Howler.stop();
        return this;
    }
}

export default HowlerSoundManager;