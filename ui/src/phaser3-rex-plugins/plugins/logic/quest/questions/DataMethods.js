export default {
    getData(key, defaultValue) {
        return this._quest.getData(key, defaultValue);
    },

    setData(key, value) {
        this._quest.setData(key, value);
        return this;
    },

    incData(key, inc, defaultValue) {
        this._quest.incData(key, inc, defaultValue);
        return this;
    },

    mulData(key, mul, defaultValue) {
        this._quest.mulData(key, mul, defaultValue);
        return this;
    },

    clearData() {
        this._quest.clearData();
        return this;
    },
}