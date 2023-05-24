var Resize = function (width, height) {
    if ((this.width === width) && (this.height === height)) {
        return this;
    }

    this.width = width;
    this.height = height;

    this.updateDisplayOrigin();

    var input = this.input;

    if (input && !input.customHitArea) {
        input.hitArea.width = width;
        input.hitArea.height = height;
    }

    return this;
}

export default Resize;