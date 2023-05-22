export default {
    resume() {
        // Resume typing timer, animation progresses and typing
        this.timeline.resume();

        return this;
    },

    resumeTyping(offsetTime) {
        // Resume typing
        this.typeWriter.resumeTyping(offsetTime);

        return this;
    }
}