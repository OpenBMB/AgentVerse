import RemoveChild from './utils/RemoveChild.js';
import GetParentSizerMethods from './GetParentSizerMethods.js';

const RemoveItem = Phaser.Utils.Array.Remove;

export default {
    removeFromParentSizer() {
        var parent = GetParentSizerMethods.getParentSizer(gameObject);
        if (parent) {
            parent.remove(this);
        }
        return this;
    },

    removeBackground(gameObject, destroyChild) {
        if (this.backgroundChildren === undefined) {
            return this;
        }

        if (this.getParentSizer(gameObject) !== this) {
            return this;
        }

        RemoveItem(this.backgroundChildren, gameObject);
        RemoveChild.call(this, gameObject, destroyChild);
        return this;
    },

    removeAllBackgrounds(destroyChild) {
        if (this.backgroundChildren === undefined) {
            return this;
        }

        for (var i = this.backgroundChildren.length - 1; i >= 0; i--) {
            this.remove(this.backgroundChildren[i], destroyChild);
        }
        return this;
    },
}