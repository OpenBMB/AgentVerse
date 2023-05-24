export default {
    hasMethod(methodName) {
        return typeof (this.gameObject[methodName]) === 'function';
    },

    call(methodName, ...parameters) {
        if (!this.hasMethod(methodName)) {
            return this;
        }

        var gameObject = this.gameObject;
        gameObject[methodName].apply(gameObject, parameters);

        return this;
    }
}