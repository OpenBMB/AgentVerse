export default {
    hasMethod(name, methodName) {
        if (!this.has(name)) {
            return false;
        }
        return this.get(name).hasMethod(methodName);
    },


    call(name, methodName, ...parameters) {
        if (!this.has(name)) {
            return this;
        }
        this.get(name).call(methodName, ...parameters);
        return this;
    },
}