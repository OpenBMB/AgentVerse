var PauseTyping = function () {
    // Already in typingPaused state
    if (this.isTypingPaused) {
        return this;
    }

    if (this.typingTimer) {  // Pause when typing timer is counting
        this.typingTimer.pause();
        this.isTypingPaused = true;
    } else if (this.inTypingProcessLoop) {  // Pause in loop of typing(), by tag
        this.inTypingProcessLoop = false;
        this.isTypingPaused = true;
    }
    return this;
}

export default PauseTyping;