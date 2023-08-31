const RemoveItem = Phaser.Utils.Array.Remove;

var Methods = {
    free(pen) {
        if (!this.PensPool) {
            return this;
        }
        this.PensPool.push(pen);
        pen.onFree();

        for (var i = 0, cnt = this.lines.length; i < cnt; i++) {
            RemoveItem(this.lines[i], pen);
        }
        return this;
    },

    freeMultiple(pens) {
        if (!this.PensPool) {
            return this;
        }

        for (var i = 0, cnt = pens.length; i < cnt; i++) {
            this.free(pens[i]);
        }

        return this;
    },

    clear() {
        // 1. Remove/recycle all children of blitter
        this.parent.removeChildren();
        // 2. Free all pens. 
        for (var i = 0, cnt = this.pens.length; i < cnt; i++) {
            this.pens[i].onFree();
        }
        // 3. Free all lines
        for (var i = 0, len = this.lines.length; i < len; i++) {
            this.lines[i].length = 0;
        }

        // 4. 
        this.PensPool.pushMultiple(this.pens);
        this.LinesPool.pushMultiple(this.lines);
        this.maxLinesWidth = undefined;

        return this;
    },

    remove(pen) {
        this.free(pen);

        return this;
    }
}

export default Methods;