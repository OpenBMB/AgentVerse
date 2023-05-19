export default {
    getChildProportion(gameObject) {
        return this.getSizerConfig(gameObject).proportion;
    },

    setChildProportion(gameObject, proportion) {
        this.getSizerConfig(gameObject).proportion = proportion;
        return this;
    },

}