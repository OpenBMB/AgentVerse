import RemoveChild from '../basesizer/utils/RemoveChild.js';
import ClearChildren from '../basesizer/utils/ClearChildren.js';

const RemoveItem = Phaser.Utils.Array.Remove;

export default {
    remove(gameObject, destroyChild) {
        if (this.getParentSizer(gameObject) !== this) {
            return this;
        }

        RemoveItem(this.sizerChildren, gameObject);
        RemoveChild.call(this, gameObject, destroyChild);
        return this;
    },

    removeAll(destroyChild) {
        for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
            this.remove(this.sizerChildren[i], destroyChild);
        }
        return this;
    },

    clear(destroyChild) {
        this.sizerChildren.length = 0;
        ClearChildren.call(this, destroyChild);
        return this;
    }
}