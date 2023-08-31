var AppendImage = function (key, frame, properties) {
    var child = this.createImageChild(key, frame, properties);
    this.addChild(child);

    return this;
};

export default AppendImage;