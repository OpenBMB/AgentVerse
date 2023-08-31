export default {
    setDropEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.dropEnable = enable;
        return this;
    },

    toggleDropEnable() {
        this.dropEnable = !this.dropEnable;
        return this;
    },
}