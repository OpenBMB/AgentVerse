var Collapse = function () {
    var root = this.root;
    root.emit('collapse', this, this.parentButton, root);

    var duration = root.easeOut.duration;
    // Don't destroy under transitOutCallback
    root.transitOutCallback(this, duration);
    this.collapseSubMenu();

    // Destroy by delayCall
    this.delayCall(duration, this.destroy, this);

    return this;
}

export default Collapse;