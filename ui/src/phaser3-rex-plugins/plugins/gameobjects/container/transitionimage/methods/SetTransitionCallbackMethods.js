export default {
    setTransitionStartCallback(callback, scope) {
        this.onStartCallback = callback;
        this.onStartCallbackScope = scope;
        return this;
    },

    setTransitionProgressCallback(callback, scope) {
        this.onProgressCallback = callback;
        this.onProgressCallbackScope = scope;
        return this;
    },

    setTransitionCompleteCallback(callback, scope) {
        this.onCompleteCallback = callback;
        this.onCompleteCallbackScope = scope;
        return this;
    },
}