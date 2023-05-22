var InsertText = function (index, text, style) {
    var children = this.createCharChildren(text, style);
    index = this.getCharChildIndex(index, true);
    this.addChild(children, index);

    return this;
};

export default InsertText;