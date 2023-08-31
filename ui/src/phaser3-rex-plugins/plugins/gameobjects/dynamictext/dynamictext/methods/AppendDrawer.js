var AppendDrawer = function (renderCallback, width, height) {
    var child = this.createDrawerChild(renderCallback, width, height);
    this.addChild(child);

    return this;
};

export default AppendDrawer;