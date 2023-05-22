export default {
    setDefaultTypingSpeed(speed) {
        this.defaultSpeed = speed;
        return this;
    },

    setTypingSpeed(speed) {
        if (speed === undefined) {
            speed = this.defaultSpeed;
        }
        this.speed = speed;
        return this;
    },
}