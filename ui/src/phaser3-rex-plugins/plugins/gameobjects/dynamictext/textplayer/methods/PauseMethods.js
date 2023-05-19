export default {
    pause() {
        // Pause typing, typing timer and animation progresses
        this.timeline.pause(); 

        return this;
    },

    pauseTyping() {
        // Pause typing
        this.typeWriter.pauseTyping();

        return this;
    }
};