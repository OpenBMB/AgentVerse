import Base from './Base.js';
import Methods from './Methods.js';
import { GetParent } from './GetParent.js';

class ContainerLite extends Base {
    constructor(scene, x, y, width, height, children) {
        if (Array.isArray(width)) {
            children = width;
            width = undefined;
            height = undefined;
        }
        super(scene, x, y, width, height);
        this.type = 'rexContainerLite';
        this.isRexContainerLite = true;
        this.syncChildrenEnable = true;

        this._active = true;
        this._mask = null;
        this._scrollFactorX = 1;
        this._scrollFactorY = 1;
        this.privateRenderLayer = undefined;

        if (children) {
            this.add(children);
        }
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.syncChildrenEnable = false; // Don't sync properties changing anymore
        super.destroy(fromScene);

        if (this.privateRenderLayer) {
            this.privateRenderLayer.list.length = 0;  // Remove all children without trigger callback
            this.privateRenderLayer.destroy();
        }
    }

    resize(width, height) {
        this.setSize(width, height);
        return this;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        if (this._x === value) {
            return;
        }
        this._x = value;

        this.syncPosition();
    }

    get y() {
        return this._y;
    }

    set y(value) {
        if (this._y === value) {
            return;
        }
        this._y = value;

        this.syncPosition();
    }

    // Override
    get rotation() {
        return super.rotation;
    }

    set rotation(value) {
        if (this.rotation === value) {
            return;
        }
        super.rotation = value;

        this.syncPosition();
    }

    // Override
    get scaleX() {
        return super.scaleX;
    }

    set scaleX(value) {
        if (this.scaleX === value) {
            return;
        }
        super.scaleX = value;

        this.syncPosition();
    }

    // Override
    get scaleY() {
        return super.scaleY;
    }

    set scaleY(value) {
        if (this.scaleY === value) {
            return;
        }
        super.scaleY = value;

        this.syncPosition();
    }

    // Override
    get scale() {
        return super.scale;
    }

    set scale(value) {
        if (this.scale === value) {
            return;
        }
        super.scale = value;

        this.syncPosition();
    }

    // Override
    get visible() {
        return super.visible;
    }

    set visible(value) {
        if (super.visible === value) {
            return;
        }
        super.visible = value;

        this.syncVisible();
    }

    // Override
    get alpha() {
        return super.alpha;
    }

    set alpha(value) {
        if (super.alpha === value) {
            return;
        }
        super.alpha = value;

        this.syncAlpha();
    }

    // Override
    get active() {
        return this._active;
    }

    set active(value) {
        if (this._active === value) {
            return;
        }
        this._active = value;

        this.syncActive();
    }

    // Override
    get mask() {
        return this._mask;
    }
    set mask(mask) {
        if (this._mask === mask) {
            return;
        }
        this._mask = mask;

        this.syncMask();
    }

    // Override
    get scrollFactorX() {
        return this._scrollFactorX;
    }

    set scrollFactorX(value) {
        if (this._scrollFactorX === value) {
            return;
        }

        this._scrollFactorX = value;
        this.syncScrollFactor();
    }
    get scrollFactorY() {
        return this._scrollFactorY;
    }

    set scrollFactorY(value) {
        if (this._scrollFactorY === value) {
            return;
        }

        this._scrollFactorY = value;
        this.syncScrollFactor();
    }

    // Compatiable with container plugin
    get list() {
        return this.children;
    }

    static GetParent(child) {
        return GetParent(child);
    }

    // For p3-container
    get parentContainer() {
        return this._parentContainer;
    }

    set parentContainer(value) {
        // Initialize
        if (!this._parentContainer && !value) {
            this._parentContainer = value;
            return;
        }

        // Set this._parentContainer only,
        // if under AddToContainer, or RemoveFromContainer methods
        if (this.setParentContainerFlag) {
            this._parentContainer = value;
            return;
        }
        // else if (!this.setParentContainerFlag)

        // Add itself and all children to container,
        // Or remove itseld and all children from container
        if (this._parentContainer && !value) {
            // Remove from container
            this.removeFromContainer();
            this._parentContainer = value;
        } else if (value) {
            // Add to container
            this._parentContainer = value;
            this.addToContainer(value);
        } else {
            this._parentContainer = value;
        }
    }

    get setParentContainerFlag() {
        if (this._setParentContainerFlag) {
            return true;
        }
        var parent = GetParent(this);
        return (parent) ? parent.setParentContainerFlag : false;
    }

}

Object.assign(
    ContainerLite.prototype,
    Methods
);

export default ContainerLite;