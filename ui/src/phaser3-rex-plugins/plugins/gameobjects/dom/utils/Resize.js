var Resize = function (width, height) {
    if (this.scene.sys.scale.autoRound) {
        width = Math.floor(width);
        height = Math.floor(height);
    }

    if ((this.width === width) && (this.height === height)) {
        return this;
    }

    var style = this.node.style;
    style.width = `${width}px`;
    style.height = `${height}px`;
    this.updateSize();
    return this;
}

export default Resize;