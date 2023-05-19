export default {
    hasData(dataKey) {
        var gameObject = this.gameObject;
        return (gameObject.data) ? gameObject.data.has(dataKey) : false;
    },

    getData(dataKey) {
        return this.gameObject.getData(dataKey);
    },

    setData(dataKey, value) {
        this.gameObject.setData(dataKey, value);
        return this;
    },
}