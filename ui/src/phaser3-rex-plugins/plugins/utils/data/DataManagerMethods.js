const DataManager = Phaser.Data.DataManager;

export default {
    // this.data
    destroyDataManager() {
        if (this.data) {
            this.data.destroy();
            this.data = undefined;
        }
    },

    setDataEnabled() {
        if (!this.data) {
            this.data = new DataManager(this);
        }

        return this;
    },

    setData(key, value) {
        if (!this.data) {
            this.data = new DataManager(this);
        }

        this.data.set(key, value);

        return this;
    },

    incData(key, value) {
        if (!this.data) {
            this.data = new DataManager(this);
        }

        this.data.inc(key, value);

        return this;
    },

    toggleData(key) {
        if (!this.data) {
            this.data = new DataManager(this);
        }

        this.data.toggle(key);

        return this;
    },

    getData(key) {
        if (!this.data) {
            this.data = new DataManager(this);
        }

        return this.data.get(key);
    },
}