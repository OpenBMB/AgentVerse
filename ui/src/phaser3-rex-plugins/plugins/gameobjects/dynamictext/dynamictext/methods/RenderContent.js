var RenderContent = function () {
    this.clear();

    this.setCanvasSize(this.width, this.height);

    if (this.background.active) {
        this.background.render();
    }

    var child;
    for (var i = 0, cnt = this.children.length; i < cnt; i++) {
        child = this.children[i];
        if (child.active) {
            child.render();
        }
    }

    if (this.innerBounds.active) {
        this.innerBounds.render();
    }
}

export default RenderContent;