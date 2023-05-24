var SkipCurrentTypingDelay = function () {
    if (this.typingTimer) {
        this.typingTimer.seek(1);
    }
    return this;
}

export default SkipCurrentTypingDelay;