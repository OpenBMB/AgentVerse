import RemoveChild from '../basesizer/utils/RemoveChild.js';
import ClearChildren from '../basesizer/utils/ClearChildren.js';

export default {
    remove(gameObject, destroyChild) {
        var key;
        if (typeof (gameObject) === 'string') {
            key = gameObject;
            gameObject = this.sizerChildren[key];
            if (!gameObject) {
                return this;
            }
        } else if (this.getParentSizer(gameObject) !== this) {
            return this;
        } else {
            key = this.childToKey(gameObject);
        }

        if (key) {
            delete this.sizerChildren[key];
            if (this.childrenMap.hasOwnProperty(key)) {
                delete this.childrenMap[key];
            }
        }
        RemoveChild.call(this, gameObject, destroyChild);
        return this;
    },

    removeAll(destroyChild) {
        for (var key in this.sizerChildren) {
            this.remove(key, destroyChild);
        }
        return this;
    },

    clear(destroyChild) {
        for (var key in this.sizerChildren) {
            delete this.sizerChildren[key];
            if (this.childrenMap.hasOwnProperty(key)) {
                delete this.childrenMap[key];
            }
        }
        ClearChildren.call(this, destroyChild);
        return this;
    }
}