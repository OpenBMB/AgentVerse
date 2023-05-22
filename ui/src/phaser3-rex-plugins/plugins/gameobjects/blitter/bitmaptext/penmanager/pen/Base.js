import BobBase from '../../../blitterbase/bob/Base.js';

class Base {
    constructor(parent) {
        this
            .setParent(parent)

        this.bobs = undefined;  // bob, or dictionary of bobs
    }

    setParent(parent) {
        this.parent = parent;
        return this;
    }

    get bitmapText() {
        if (this.parent) {
            return this.parent.bitmapText;
        } else {
            return undefined;
        }
    }

    onFree() {
        this
            .setParent();

        if (this.bobs instanceof BobBase) {
            this.bobs.destroy();
            this.bobs = undefined;
        } else {
            var bobs = this.bobs;
            for (var key in bobs) {
                bobs[key].destroy();
                delete bobs[key];
            }
        }
    }

    destroy() {
        this.parent.remove(this);
    }

}

export default Base;