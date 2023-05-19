import DataMethods from '../../../../utils/data/DataMethods.js'

class Base {
    constructor(parent, type) {
        this.setParent(parent);
        this.type = type;
        this.renderable = false;

        this.reset().setActive();
    }

    destroy() {
        this.parent.removeChild(this);
    }

    setParent(parent) {
        this.parent = parent;
        return this;
    }

    get scene() {
        return this.parent.scene;
    }

    get canvas() {
        return (this.parent) ? this.parent.canvas : null;
    }

    get context() {
        return (this.parent) ? this.parent.context : null;
    }

    setDirty(dirty) {
        if (dirty && this.parent) {
            this.parent.dirty = true;
        }
        return this;
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this.setDirty(this._active != value);
        this._active = value;
    }

    setActive(active) {
        if (active === undefined) {
            active = true;
        }
        this.active = active;
        return this;
    }

    modifyPorperties(o) {
        return this;
    }

    // Override
    onFree() {
        this.reset().setParent();
    }

    // Override
    reset() {
        return this;
    }

    // Override
    render() { }

    // Override
    contains(x, y) {
        return false;
    }
}

Object.assign(
    Base.prototype,
    DataMethods
);

export default Base;