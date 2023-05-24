export default {
    setContentOutputEnable(enable) {
        this.parser.setContentOutputEnable(enable);
        return this;
    },

    setContentCallback(callback, scope) {
        this.contentCallback = callback;
        this.contentCallbackScope = scope;
        return this;
    },
}