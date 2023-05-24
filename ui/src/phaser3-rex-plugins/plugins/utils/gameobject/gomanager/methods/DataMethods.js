export default {
    hasData(name, dataKey) {
        if (!this.has(name)) {
            return false;
        }
        return this.get(name).hasData(dataKey);
    },

    getData(name, dataKey) {
        if (!this.has(name)) {
            return undefined;
        }
        return this.get(name).getData(dataKey);
    },

    setData(name, dataKey, value) {
        if (!this.has(name)) {
            return this;
        }
        this.get(name).setData(dataKey, value);
        return this;
    },
}