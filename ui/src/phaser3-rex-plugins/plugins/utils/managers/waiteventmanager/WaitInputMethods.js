export default {
    waitClick() {
        if (!this.clickEE) {
            return this.waitTime(0);
        }

        return this.waitEvent(this.clickEE, 'pointerdown');
    },

    waitKeyDown(key) {
        var eventEmitter = this.scene.input.keyboard;
        if (typeof (key) === 'string') {
            return this.waitEvent(eventEmitter, `keydown-${key.toUpperCase()}`)
        } else {
            return this.waitEvent(eventEmitter, 'keydown');
        }
    }
}