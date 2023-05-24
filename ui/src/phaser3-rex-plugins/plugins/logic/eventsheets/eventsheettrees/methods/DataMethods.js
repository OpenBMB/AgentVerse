export default {
    setData(key, value) {
        this.blackboard.setData(key, value);
        return this;
    },

    hasData(key) {
        return this.blackboard.hasData(key);
    },

    incData(key, inc) {
        this.blackboard.incData(key, inc);
        return this;
    },

    toggleData(key) {
        this.blackboard.toggleData(key);
        return this;
    },

    getData(key) {
        return this.blackboard.getData(key);
    },
}