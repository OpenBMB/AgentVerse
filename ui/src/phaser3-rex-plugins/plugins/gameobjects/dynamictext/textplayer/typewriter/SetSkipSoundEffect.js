var SetSkipSoundEffect = function (value) {
    if (value === undefined) {
        value = true;
    }
    this.skipSoundEffect = value;

    if (value) {
        var soundManager = this.textPlayer._soundManager;
        if (soundManager) {
            soundManager.fadeOutAllSoundEffects(100, true);
        }
    }
    return this;
}

export default SetSkipSoundEffect;