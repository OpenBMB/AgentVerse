var SetDraggable = function (senser, draggable) {
    var senserType = typeof (senser);
    if (senserType === 'string') {
        var senserName = senser;
        senser = this.getElement(senserName);
        if (!senser) {
            console.error(`Can get element '${senserName}'`);
            return this;
        }
    } else if ((senser === undefined) || (senserType != 'object')) {
        draggable = senser;
        senser = this;
    }
    if (draggable === undefined) {
        draggable = true;
    }

    if (senser.input && senser.input._dragTopmostSizer) {
        // Draggable is already registered
        senser.input.draggable = draggable;
    } else if (draggable) {
        // Register draggable
        senser.setInteractive();
        senser.scene.input.setDraggable(senser);
        senser
            .on('drag', function (pointer, dragX, dragY) {
                var topmostParent = this.getTopmostSizer();
                topmostParent.x += (dragX - senser.x);
                topmostParent.y += (dragY - senser.y);
                topmostParent.emit('sizer.drag', pointer, dragX, dragY);
            }, this)
            .on('dragstart', function (pointer, dragX, dragY) {
                var topmostParent = this.getTopmostSizer();
                topmostParent.emit('sizer.dragstart', pointer, dragX, dragY);
            }, this)
            .on('dragend', function (pointer, dragX, dragY, dropped) {
                var topmostParent = this.getTopmostSizer();
                topmostParent.emit('sizer.dragend', pointer, dragX, dragY, dropped);
            }, this)
        senser.input._dragTopmostSizer = true;
    } else {
        // Not draggable and draggable is not registered yet, do nothing
    }
    return this;
}

export default SetDraggable;