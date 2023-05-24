class HowlerSound {
    constructor(manager, key) {
        this.manager = manager;
        this.key = key;
        this.soundBuffer = manager.get(key);

        // Store id number instead of sound instance object
        this.id = this.soundBuffer.play();
    }

    play() {
        this.soundBuffer.play(this.id);
        return this;
    }

    pause() {
        this.soundBuffer.pause(this.id);
        return this;
    }

    stop() {
        this.soundBuffer.stop(this.id);
        return this;
    }

    mute() {
        this.soundBuffer.mute(true, this.id);
        return this;
    }

    unMute() {
        this.soundBuffer.mute(false, this.id);
        return this;
    }

    setVolume(volume) {
        this.soundBuffer.volume(volume, this.id);
        return this;
    }

    fade(from, to, duration) {
        this.soundBuffer.fade(from, to, duration, this.id);
        return this;
    }

    setRate(rate) {
        this.soundBuffer.rate(rate, this.id);
        return this;
    }

    seek(time) {
        this.soundBuffer.seek(time, this.id);
        return this;
    }

    setLoop(looping) {
        if (looping === undefined) {
            looping = true;
        }

        this.soundBuffer.loop(looping, this.id);
        return this;
    }

    get playing() {
        return this.soundBuffer.playing(this.id);
    }

    get duration() {
        return this.soundBuffer.duration(this.id);
    }
}

export default HowlerSound;