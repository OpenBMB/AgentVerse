import GetFirstChildContains from './GetFirstChildContains.js';

var SetChildrenInteractive = function () {
    this
        .on('pointerdown', OnPointerDown, this)

        .on('pointerdown', OnPointerUp, this)

        .on('pointermove', OnPointOverOut, this)
        .on('pointerover', OnPointOverOut, this)
        .on('pointerout', function (pointer, event) {
            OnPointOverOut.call(this, pointer, null, null, event);
        }, this)

    return this;
}

var OnPointerDown = function (pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
        return;
    }

    var child = GetFirstChildContains(this.children, localX, localY);
    if (!child) {
        return;
    }

    this.emit('child.pointerdown', child, pointer, localX, localY, event);
}

var OnPointerUp = function (pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
        return;
    }

    var child = GetFirstChildContains(this.children, localX, localY);
    if (!child) {
        return;
    }

    this.emit('child.pointerup', child, pointer, localX, localY, event);
}

var OnPointOverOut = function (pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
        return;
    }

    if (localX === null) {  // Case of pointerout
        if (this.lastOverChild !== null) {
            this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
            this.lastOverChild = null;
        }
        return;
    }

    var child = GetFirstChildContains(this.children, localX, localY);
    if (child === this.lastOverChild) {
        return;
    }

    if (this.lastOverChild !== null) {
        this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
    }

    if (child !== null) {
        this.emit('child.pointerover', child, pointer, localX, localY, event);
    }

    this.lastOverChild = child;
}

export default SetChildrenInteractive;