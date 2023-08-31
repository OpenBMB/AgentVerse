import RemoveChild from '../basesizer/utils/RemoveChild.js';
import ClearChildren from '../basesizer/utils/ClearChildren.js';
import ArrayFill from '../../../plugins/utils/array/Fill.js';

export default {
    remove(gameObject, destroyChild) {
        if (this.getParentSizer(gameObject) !== this) {
            return this;
        }

        var idx = this.sizerChildren.indexOf(gameObject);
        if (idx !== -1) {
            this.sizerChildren[idx] = null;
        }

        RemoveChild.call(this, gameObject, destroyChild);
        return this;
    },

    removeAt(columnIndex, rowIndex, destroyChild) {
        var child = this.getChildAt(columnIndex, rowIndex);
        if (child) {
            this.remove(child, destroyChild);
        }
        return this;
    },

    removeAll(destroyChild) {
        for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
            var child = this.sizerChildren[i];
            if (!child) {
                continue;
            }

            this.remove(child, destroyChild);
        }
        return this;
    },

    clear(destroyChild) {
        ArrayFill(this.sizerChildren, null);
        ClearChildren.call(this, destroyChild);
        return this;
    }
}