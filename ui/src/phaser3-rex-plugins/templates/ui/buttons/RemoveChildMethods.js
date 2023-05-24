import Sizer from '../sizer/Sizer.js';
import IsArray from '../../../plugins/utils/object/IsArray.js';

const SizerRmove = Sizer.prototype.remove;
const SizerClear = Sizer.prototype.clear;

var Remove = function (gameObject, destroyChild) {
    if (this.getParentSizer(gameObject) !== this) {
        return this;
    }

    this.buttonGroup.remove(gameObject);
    SizerRmove.call(this, gameObject, destroyChild);
    return this;
};

export default {
    remove(gameObject, destroyChild) {
        // Remove gameObject no matter it is a button or not
        if (IsArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                Remove.call(this, gameObjects[i], destroyChild);
            }
        } else {
            Remove.call(this, gameObject, destroyChild);
        }
        return this;
    },

    clear(destroyChild) {
        var buttons = this.buttonGroup.buttons;
        buttons.length = 0;
        SizerClear.call(this, destroyChild);
        return this;
    },

    removeButton(gameObject, destroyChild) {
        var gameObject = this.getButton(gameObject);
        // Don't remove this gameObject, it is not a button
        if (!gameObject) {
            return this;
        }
        this.remove(gameObject, destroyChild);
        return this;
    },

    clearButtons(destroyChild) {
        var buttons = this.buttonGroup.buttons;
        for (var i = buttons.length - 1; i >= 0; i--) {
            Remove.call(this, buttons[i], destroyChild);
        }
        return this;
    }
}