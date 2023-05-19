var ShowPage = function () {
    // Only can work after playing, and before processing last child
    if (!this.isPlaying || !this.isPageTyping) {
        return this;
    }

    // Save parameters
    var typingSpeedSave = this.typeWriter.speed;
    var ignoreWaitSave = this.typeWriter.ignoreWait;
    var skipTypingAnimationSave = this.typeWriter.skipTypingAnimation;
    var skipSoundEffectSave = this.typeWriter.skipSoundEffect;

    this.typeWriter
        .once('complete', function () {
            // Recover parameters
            this.typeWriter
                .setTypingSpeed(typingSpeedSave)
                .setIgnoreWait(ignoreWaitSave)
                .setSkipTypingAnimation(skipTypingAnimationSave)
                .setSkipSoundEffect(skipSoundEffectSave)

        }, this)

        .setTypingSpeed(0)
        .skipCurrentTypingDelay()
        .setIgnoreWait(true)
        .setSkipTypingAnimation(true)
        .setSkipSoundEffect(true)

    return this;
}

export default ShowPage;