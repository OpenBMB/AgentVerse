var SetDraggable = function (enable) {
    if (enable === undefined) {
        enable = true;
    }
    this.setInteractive();
    this.input.drag.enable = enable;
    if (!enable) {
        this.input.drag.state = 0;
    }
    return this;
}
export default SetDraggable;