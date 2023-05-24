var Expand = function () {
    var root = this.root;

    var duration = root.easeIn.duration;
    // Ease in menu
    root.transitInCallback(this, duration);

    if (this !== this.root) {
        this.delayCall(duration, function () {
            // Pass event to root menu object
            this.root.emit('popup.complete', this);
        }, this);
    }
}

export default Expand;