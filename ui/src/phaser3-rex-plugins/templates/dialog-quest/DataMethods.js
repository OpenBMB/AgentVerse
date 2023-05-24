export default {
    getData(key, defaultValue) {
        return this.questionManager.getData(key, defaultValue);
    },

    setData(key, value) {
        this.questionManager.setData(key, value);
        return this;
    },

    incData(key, inc, defaultValue) {
        this.questionManager.incData(key, inc, defaultValue);
        return this;
    },

    mulData(key, mul, defaultValue) {
        this.questionManager.mulData(key, mul, defaultValue);
        return this;
    },

    clearData() {
        this.questionManager.clearData();
        return this;
    },
};