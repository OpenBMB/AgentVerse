var SetInteractive = function () {
    this.parent

        .on('pointerdown', OnAreaDown, this)

        .on('pointerup', OnAreaUp, this)

        .on('pointermove', OnAreaOverOut, this)
        .on('pointerover', OnAreaOverOut, this)
        .on('pointerout', function (pointer, event) {
            OnAreaOverOut.call(this, pointer, null, null, event);
        }, this)
}

var OnAreaDown = function (pointer, localX, localY, event) {
    var area = this.hitAreaManager.getFirst(localX, localY);
    if (area === null) {
        return;
    }

    var key = area.data.key;
    FireEvent.call(this, 'areadown', key, pointer, localX, localY, event);

    area.data.isDown = true;
}

var OnAreaUp = function (pointer, localX, localY, event) {
    var area = this.hitAreaManager.getFirst(localX, localY);
    if (area === null) {
        return;
    }

    var areaData = area.data;

    var key = areaData.key;
    FireEvent.call(this, 'areaup', key, pointer, localX, localY, event);

    if (areaData.isDown) {
        FireEvent.call(this, 'areaclick', key, pointer, localX, localY, event);

        var url = areaData.url;
        if (url) {
            window.open(url, '_blank');
        }
    }

    areaData.isDown = false;
}

var OnAreaOverOut = function (pointer, localX, localY, event) {
    if (localX === null) {  // Case of pointerout
        if (this.lastHitAreaKey !== null) {
            FireEvent.call(this, 'areaout', this.lastHitAreaKey, pointer, localX, localY, event);
            this.hitAreaManager.getByKey(this.lastHitAreaKey).isDown = false;
            this.lastHitAreaKey = null;
        }
        return;
    }

    var area = this.hitAreaManager.getFirst(localX, localY);
    var key = (area) ? area.data.key : null;
    if (this.lastHitAreaKey === key) {
        return;
    }

    if (this.lastHitAreaKey !== null) {
        FireEvent.call(this, 'areaout', this.lastHitAreaKey, pointer, localX, localY, event);

        var prevHitArea = this.hitAreaManager.getByKey(this.lastHitAreaKey);
        if (this.urlTagCursorStyle && !!prevHitArea.data.url) {
            this.scene.input.manager.canvas.style.cursor = '';
        }

        prevHitArea.isDown = false;
    }
    if (key !== null) {
        FireEvent.call(this, 'areaover', key, pointer, localX, localY, event);

        if (this.urlTagCursorStyle && !!area.data.url) {
            this.scene.input.manager.canvas.style.cursor = this.urlTagCursorStyle;
        }
    }

    this.lastHitAreaKey = key;
}

var FireEvent = function (eventName, key, pointer, localX, localY, event) {
    this.parent.emit(`${eventName}-${key}`, pointer, localX, localY, event);
    this.parent.emit(eventName, key, pointer, localX, localY, event);
}
export default SetInteractive;