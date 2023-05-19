var ResumeTyping = function (offsetTime) {
    // Already not in typingPaused state
    if (!this.isTypingPaused) {
        return this;
    }
    if (offsetTime === undefined) {
        offsetTime = 0;
    }

    if (this.typingTimer) {  // Pause when typing timer is paused
        this.isTypingPaused = false;
        this.typingTimer.resume();
        this.typingTimer.remainder += offsetTime;
    } else if (this.isTypingPaused) {  // Resume paused by tag
        this.isTypingPaused = false;
        this.typing(offsetTime);
    }
    return this;
}

export default ResumeTyping;