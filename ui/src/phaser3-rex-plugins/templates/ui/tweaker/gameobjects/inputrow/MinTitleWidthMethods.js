export default {
    getMinTitleWidth() {
        var title = this.childrenMap.title;
        if (!title) {
            return 0;
        }

        var padding = title.rexSizer.padding;
        var titleWidth = this.getChildWidth(this.childrenMap.title) + padding.left + padding.right;
        return titleWidth + this.getInnerPadding('left');
    },

    setMinTitleWidth(width) {
        var title = this.childrenMap.title;
        if (!title) {
            return this;
        }

        var padding = title.rexSizer.padding;
        width -= padding.left + padding.right;

        title.minWidth = width;
        return this;
    }
}