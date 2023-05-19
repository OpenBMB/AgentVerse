import Base from './Base.js';
import { GetParent } from './GetParent.js';

const BaseRemove = Base.prototype.remove;
const BaseClear = Base.prototype.clear;

export default {
    // Can override this method
    remove(gameObject, destroyChild) {
        if (GetParent(gameObject) !== this) {
            return this;
        }
        this.setParent(gameObject, null);

        if (!destroyChild) {
            this.removeFromRenderLayer(gameObject);
        }

        BaseRemove.call(this, gameObject, destroyChild);
        return this;
    },

    // Don't override this method
    unpin(gameObject, destroyChild) {
        if (GetParent(gameObject) !== this) {
            return this;
        }
        this.setParent(gameObject, null);

        if (!destroyChild) {
            this.removeFromRenderLayer(gameObject);
        }

        BaseRemove.call(this, gameObject, destroyChild);
        return this;
    },

    clear(destroyChild) {
        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            this.setParent(child, null);

            if (!destroyChild) {
                this.removeFromRenderLayer(child);
            }
        }
        BaseClear.call(this, destroyChild);
        return this;
    },
};