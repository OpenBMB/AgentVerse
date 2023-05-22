import Sizer from '../../sizer/Sizer.js';
import GetScrollMode from '../GetScrollMode.js';
import CreateScrollableSizer from './CreateScrollableSizer.js';
import ResizeController from './ResizeController.js';
import UpdateController from './UpdateController.js';


const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class Scrollable extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var scrollMode = GetScrollMode(config); // Left-to-right, or top-to-bottom
        // Create sizer
        config.orientation = (scrollMode === 0) ? 1 : 0;
        super(scene, config);
        this.type = GetValue(config, 'type', 'rexScrollable');

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var scrollableSizer = CreateScrollableSizer(this, config);
        var header = GetValue(config, 'header', undefined);
        var footer = GetValue(config, 'footer', undefined);

        // Background
        if (background) {
            this.addBackground(background);
        }

        if (header) {
            var align = GetValue(config, 'align.header', 'center');
            var headerSpace = GetValue(config, 'space.header', 0);
            var padding;
            if (scrollMode === 0) {
                padding = { bottom: headerSpace };
            } else {
                padding = { right: headerSpace };
            }
            var expand = GetValue(config, 'expand.header', true);
            this.add(header,
                {
                    proportion: 0,
                    align: align,
                    padding: padding,
                    expand: expand
                }
            );
        }

        if (scrollableSizer) {
            this.add(scrollableSizer,
                {
                    proportion: 1,
                    align: 'center',
                    padding: 0,
                    expand: true
                }
            );
        }

        if (footer) {
            var align = GetValue(config, 'align.footer', 'center');
            var footerSpace = GetValue(config, 'space.footer', 0);
            var padding;
            if (scrollMode === 0) {
                padding = { top: footerSpace };
            } else {
                padding = { left: footerSpace };
            }
            var expand = GetValue(config, 'expand.footer', true);
            this.add(footer,
                {
                    proportion: 0,
                    align: align,
                    padding: padding,
                    expand: expand
                }
            );
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('header', header);
        this.addChildrenMap('footer', footer);

        this.runLayoutFlag = false;

        /* Necessary properties of child object
        - child.t (RW), 
        - child.childOY (RW)
        - child.topChildOY (R)
        - child.bottomChildOY (R)
        - child.childVisibleHeight (R)
        - child.childHeight (R)
        */
    }

    runLayout(parent, newWidth, newHeight) {
        // Skip hidden or !dirty sizer
        if (this.ignoreLayout) {
            return this;
        }
        super.runLayout(parent, newWidth, newHeight);
        this.resizeController();

        // Set `t` to 0 at first runLayout()
        if (!this.runLayoutFlag) {
            this.runLayoutFlag = true;
            this.setT(0);
        }

        return this;
    }

    set t(t) {
        // Get inner childT
        var childMargin = this.childMargin;
        if ((childMargin.top !== 0) || (childMargin.bottom !== 0)) {
            var child = this.childrenMap.child;
            var innerHeight = (child.topChildOY - child.bottomChildOY);
            var outerHeight = innerHeight + childMargin.top + childMargin.bottom;
            var innerChildOY = (outerHeight * t) - childMargin.top;
            t = innerChildOY / innerHeight;
        }

        this.childrenMap.child.t = t;
        this.updateController();
    }

    get t() {
        var t = this.childrenMap.child.t;

        // Get outer childT
        var childMargin = this.childMargin;
        if ((childMargin.top !== 0) || (childMargin.bottom !== 0)) {
            var child = this.childrenMap.child;
            var innerHeight = (child.topChildOY - child.bottomChildOY);
            var outerHeight = innerHeight + childMargin.top + childMargin.bottom;
            var outerChildOY = (innerHeight * t) + childMargin.top;
            t = outerChildOY / outerHeight;
        }
        return t;
    }

    set childOY(value) {
        this.childrenMap.child.childOY = value;
        this.updateController();
    }

    get childOY() {
        return this.childrenMap.child.childOY;
    }

    get topChildOY() {
        return this.childrenMap.child.topChildOY + this.childMargin.top;
    }

    get bottomChildOY() {
        return this.childrenMap.child.bottomChildOY - this.childMargin.bottom;
    }

    get childVisibleHeight() {
        return this.childrenMap.child.childVisibleHeight;
    }

    get childHeight() {
        return this.childrenMap.child.childHeight;
    }

    get isOverflow() {
        var child = this.childrenMap.child;
        return child.topChildOY !== child.bottomChildOY;
    }

    get scrollMode() {
        return (this.orientation === 0) ? 1 : 0;
    }

    setChildOY(value, clamp) {
        if (clamp === undefined) {
            clamp = false;
        }
        if (clamp) {
            value = Clamp(value, this.bottomChildOY, this.topChildOY);
        }
        this.childOY = value;
        return this;
    }

    addChildOY(inc, clamp) {
        this.setChildOY(this.childOY + inc, clamp);
        return this;
    }

    setT(value, clamp) {
        if (clamp === undefined) {
            clamp = false;
        }
        if (clamp) {
            value = Clamp(value, 0, 1);
        }
        this.t = value;
        return this;
    }

    addT(inc, clamp) {
        this.setT(this.t + inc, clamp);
        return this;
    }

    scrollToTop() {
        this.t = 0;
        return this;
    }

    scrollToBottom() {
        this.t = 1;
        // t will be 0 if panel/table does not exceed visible area
        if (this.t === 0) {
            return this;
        }

        // Panel/Table height might be expanded while cells are visible        
        do {
            this.t = 1;
        } while (this.t !== 1)

        return this;
    }

    get sliderEnable() {
        var slider = this.childrenMap.slider;
        if (!slider) {
            return false;
        }

        return slider.enable;
    }

    set sliderEnable(value) {
        var slider = this.childrenMap.slider;
        if (!slider) {
            return;
        }
        slider.setEnable(value);
    }

    setSliderEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.sliderEnable = enabled;
        return this;
    }

    get scrollerEnable() {
        var scroller = this.childrenMap.scroller;
        if (!scroller) {
            return false;
        }

        return scroller.enable;
    }

    set scrollerEnable(value) {
        var scroller = this.childrenMap.scroller;
        if (!scroller) {
            return;
        }
        scroller.setEnable(value);
    }

    setScrollerEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.scrollerEnable = enabled;
        return this;
    }

    get mouseWheelScrollerEnable() {
        var mouseWheelScroller = this.childrenMap.mouseWheelScroller;
        if (!mouseWheelScroller) {
            return false;
        }

        return mouseWheelScroller.enable;
    }

    set mouseWheelScrollerEnable(value) {
        var mouseWheelScroller = this.childrenMap.mouseWheelScrollerEnable;
        if (!mouseWheelScroller) {
            return;
        }
        mouseWheelScroller.setEnable(value);
    }

    setMouseWheelScrollerEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.mouseWheelScrollerEnable = enabled;
        return this;
    }

    setDropZoneEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        var child = this.childrenMap.child;
        child.setInteractive();
        child.input.dropZone = enable;
        return this;
    }

}

var Methods = {
    resizeController: ResizeController,
    updateController: UpdateController
}

// mixin
Object.assign(
    Scrollable.prototype,
    Methods
);

export default Scrollable;