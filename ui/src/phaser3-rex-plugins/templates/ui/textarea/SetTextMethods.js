export default {
    setText(text) {
        var textBlock = this.childrenMap.child;
        textBlock.setText(text);

        this.resizeController();
        return this;
    },

    appendText(text) {
        this.setText(this.text + text);
        return this;
    }
}