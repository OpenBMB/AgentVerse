var AppendSpace = function (width) {
    var child = this.createSpaceChild(width);
    this.addChild(child);

    return this;
};

export default AppendSpace;