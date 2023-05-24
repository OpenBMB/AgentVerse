export default {
    setContentCallback(callback, scope) {
        this.contentCallback = callback;
        this.contentCallbackScope = scope;
        return this;
    }
}