export default {
    waitBackgroundMusicComplete() {
        if (!this.parent.soundManager) {
            return this.waitTime(0);
        }
        var music = this.parent.soundManager.getBackgroundMusic();
        if (!music) {
            return this.waitTime(0);
        }
        return this.waitEvent(music, 'complete');
    },

    waitBackgroundMusic2Complete() {
        if (!this.parent.soundManager) {
            return this.waitTime(0);
        }
        var music = this.parent.soundManager.getBackgroundMusic2();
        if (!music) {
            return this.waitTime(0);
        }
        return this.waitEvent(music, 'complete');
    },

    waitSoundEffectComplete() {
        if (!this.parent.soundManager) {
            return this.waitTime(0);
        }
        var music = this.parent.soundManager.getLastSoundEffect();
        if (!music) {
            return this.waitTime(0);
        }
        return this.waitEvent(music, 'complete');
    },

    waitSoundEffect2Complete() {
        if (!this.parent.soundManager) {
            return this.waitTime(0);
        }
        var music = this.parent.soundManager.getLastSoundEffect2();
        if (!music) {
            return this.waitTime(0);
        }
        return this.waitEvent(music, 'complete');
    }
}