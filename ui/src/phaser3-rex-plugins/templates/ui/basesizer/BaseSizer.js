import Container from '../container/Container.js';
import Methods from './Methods.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';
import Clear from '../../../plugins/utils/object/Clear.js'

const GetValue = Phaser.Utils.Objects.GetValue;

class Base extends Container {
    constructor(scene, x, y, minWidth, minHeight, config) {
        super(scene, x, y, 1, 1);

        this.isRexSizer = true;
        this.setMinSize(minWidth, minHeight);
        this.setName(GetValue(config, 'name', ''));
        this.rexSizer = {};
        this.space = {};
        this.backgroundChildren = undefined;
        this.sizerChildren = undefined; // [] or {}
        this.childrenMap = {};
        this.layoutedChildren = undefined;

        var anchorConfig = GetValue(config, 'anchor', undefined);
        if (anchorConfig) {
            this.setAnchor(anchorConfig);
        }

        this.setInnerPadding(GetValue(config, 'space', 0));

        var draggable = GetValue(config, 'draggable', false);
        if (draggable) {
            this.setDraggable(draggable);
        }

        this.setSizerEventsEnable(GetValue(config, 'sizerEvents', false));
        this.setDirty(true);

        if (GetValue(config, 'enableLayer', false)) {
            this.enableLayer();
        }
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        if (fromScene) {
            // In this case, children will be cleared and destroy in scene level
            var sizers = this.getAllChildrenSizers([this]);
            for (var i = 0, cnt = sizers.length; i < cnt; i++) {
                sizers[i].sizerEventsEnable = false;
            }
        }

        super.destroy(fromScene);

        Clear(this.backgroundChildren);
        Clear(this.sizerChildren);
        this.childrenMap = undefined;
        this.space = undefined;
        this.rexSizer = undefined;
        this.layoutedChildren = undefined;
    }

    setMinSize(minWidth, minHeight) {
        this.setMinWidth(minWidth).setMinHeight(minHeight);
        return this;
    }

    setMinWidth(minWidth) {
        if (minWidth == null) {
            minWidth = 0;
        }
        this.minWidth = minWidth;
        return this;
    }

    setMinHeight(minHeight) {
        if (minHeight == null) {
            minHeight = 0;
        }
        this.minHeight = minHeight;
        return this;
    }

    setDirty(dirty) {
        if (dirty === undefined) {
            dirty = true;
        }
        this.dirty = dirty;
        return this;
    }

    setSizerEventsEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.sizerEventsEnable = enable;
        return this;
    }

    get ignoreLayout() {
        // Skip hidden or !dirty sizer
        return this.rexSizer.hidden || (!this.dirty);
    }

    get childrenWidth() {
        if (this._childrenWidth === undefined) {
            this._childrenWidth = this.getChildrenWidth();
        }
        return this._childrenWidth;
    }

    get childrenHeight() {
        if (this._childrenHeight === undefined) {
            this._childrenHeight = this.getChildrenHeight();
        }
        return this._childrenHeight;
    }

    get left() {
        return this.x - (GetDisplayWidth(this) * this.originX);
    }

    set left(value) {
        this.x += (value - this.left);
    }

    alignLeft(value) {
        this.left = value;
        return this;
    }

    get right() {
        return this.left + GetDisplayWidth(this);
    }

    set right(value) {
        this.x += (value - this.right);
    }

    alignRight(value) {
        this.right = value;
        return this;
    }

    get centerX() {
        return this.left + (GetDisplayWidth(this) / 2);
    }

    set centerX(value) {
        this.x += (value - this.centerX);
    }

    alignCenterX(value) {
        this.centerX = value;
        return this;
    }

    get top() {
        return this.y - (GetDisplayHeight(this) * this.originY);
    }

    set top(value) {
        this.y += (value - this.top);
    }

    alignTop(value) {
        this.top = value;
        return this;
    }

    get bottom() {
        return this.top + GetDisplayHeight(this);
    }

    set bottom(value) {
        this.y += (value - this.bottom);
    }

    alignBottom(value) {
        this.bottom = value;
        return this;
    }

    get centerY() {
        return this.top + (GetDisplayHeight(this) / 2);
    }

    set centerY(value) {
        this.y += (value - this.centerY);
    }

    alignCenterY(value) {
        this.centerY = value;
        return this;
    }

    get innerLeft() {
        return this.left + this.space.left;
    }

    get innerRight() {
        return this.right - this.space.right;
    }

    get innerTop() {
        return this.top + this.space.top;
    }

    get innerBottom() {
        return this.bottom - this.space.bottom;
    }

    get innerWidth() {
        return this.width - this.space.left - this.space.right;
    }

    get innerHeight() {
        return this.height - this.space.top - this.space.bottom;
    }

    get minInnerWidth() {
        var result = this.minWidth - this.space.left - this.space.right;
        return Math.max(result, 0);
    }

    get minInnerHeight() {
        var result = this.minHeight - this.space.top - this.space.bottom;
        return Math.max(result, 0);
    }
}

Object.assign(
    Base.prototype,
    Methods
);

export default Base;