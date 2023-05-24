export default {
    getMaxInputRowTitleWidth() {
        var maxTitleWidth = 0;
        var children = this.childrenMap.pages.children;  // tweaker array
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            maxTitleWidth = Math.max(maxTitleWidth, children[i].getMaxInputRowTitleWidth());
        }

        return maxTitleWidth + this.getInnerPadding('left');
    },

    setInputRowTitleWidth(width) {
        width -= this.getInnerPadding('left');

        var children = this.childrenMap.pages.children;  // tweaker array
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            children[i].setInputRowTitleWidth(width);
        }
        return this;
    }
}