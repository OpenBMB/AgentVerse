var AppendText = function (text, style) {
    var children = this.createCharChildren(text, style);
    this.addChild(children);
    return this;
};

export default AppendText;