export default {
    getChildExpand(gameObject) {
        return this.getSizerConfig(gameObject).expand;
    },

    setChildExpand(gameObject, expand) {
        this.getSizerConfig(gameObject).expand = expand;
        return this;
    },

}