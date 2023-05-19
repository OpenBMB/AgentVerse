import Sizer from '../sizer/Sizer.js';
import AddChildMask from '../../../plugins/gameobjects/container/containerlite/mask/AddChildMask.js';
import SetDisplaySize from '../../../plugins/utils/size/SetDisplaySize.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Label extends Sizer {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexLabel';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var icon = GetValue(config, 'icon', undefined);
        var iconMask = GetValue(config, 'iconMask', undefined);
        var text = GetValue(config, 'text', undefined);
        var action = GetValue(config, 'action', undefined);
        var actionMask = GetValue(config, 'actionMask', undefined);
        // Align
        var align = GetValue(config, 'align', undefined); // undefined/left/top: no space


        if (background) {
            this.addBackground(background);
        }

        // Add space
        if (
            (align === 'right') ||
            (align === 'bottom') ||
            (align === 'center')
        ) {
            this.addSpace();
        }

        if (icon) {
            var iconSpace = GetValue(config, 'space.icon', 0);
            var padding;
            if (this.orientation === 0) {
                if (text || action) {
                    padding = { right: iconSpace };
                }
            } else {
                if (text || action) {
                    padding = { bottom: iconSpace };
                }
            }
            var fitRatio = GetValue(config, 'squareFitIcon', false) ? 1 : 0;

            this.add(
                icon,
                { proportion: 0, padding: padding, fitRatio: fitRatio }
            );

            if (iconMask) {
                iconMask = AddChildMask.call(this, icon, icon, 1); // Circle mask
            }

            if (!fitRatio) {
                var iconSize = GetValue(config, 'iconSize', undefined);
                this.setIconSize(
                    GetValue(config, 'iconWidth', iconSize),
                    GetValue(config, 'iconHeight', iconSize)
                );
            }
        }


        if (text) {
            var textSpace = GetValue(config, 'space.text', 0);
            var expandTextWidth = GetValue(config, 'expandTextWidth', false);
            var expandTextHeight = GetValue(config, 'expandTextHeight', false);
            var proportion, padding, expand;
            if (this.orientation === 0) {
                proportion = (expandTextWidth) ? 1 : 0;
                if (action) {
                    padding = { right: textSpace };
                }
                expand = expandTextHeight;
            } else {
                proportion = (expandTextHeight) ? 1 : 0;
                if (action) {
                    padding = { bottom: textSpace };
                }
                expand = expandTextWidth;
            }

            this.add(
                text,
                { proportion: proportion, expand: expand, padding: padding, }
            );
        }

        if (action) {
            var fitRatio = GetValue(config, 'squareFitAction', false) ? 1 : 0;
            this.add(
                action,
                { proportion: 0, fitRatio: fitRatio }
            );

            if (actionMask) {
                actionMask = AddChildMask.call(this, action, action, 1); // Circle mask
            }

            if (!fitRatio) {
                var actionSize = GetValue(config, 'actionSize');
                this.setActionSize(
                    GetValue(config, 'actionWidth', actionSize),
                    GetValue(config, 'actionHeight', actionSize)
                );
            }
        }

        // Add space
        if (align === 'center') {
            this.addSpace();
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('icon', icon);
        this.addChildrenMap('iconMask', iconMask);
        this.addChildrenMap('text', text);
        this.addChildrenMap('action', action);
        this.addChildrenMap('actionMask', actionMask);
    }

    // Access text game object
    get text() {
        var textObject = this.childrenMap.text;
        if (textObject === undefined) {
            return '';
        }
        return textObject.text;
    }

    set text(value) {
        var textObject = this.childrenMap.text;
        if (textObject === undefined) {
            return;
        }
        textObject.setText(value);
    }

    setText(value) {
        this.text = value;
        return this;
    }

    // Access icon game object
    setIconTexture(key, frame) {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return this;
        }
        imageObject.setTexture(key, frame);

        if (this.iconWidth !== undefined) {
            SetDisplaySize(imageObject, this.iconWidth, this.iconHeight);
            this.resetChildScaleState(imageObject);
        }

        return this;
    }

    setTexture(key, frame) {
        this.setIconTexture(key, frame);
        return this;
    }

    setIconSize(width, height) {
        if (height === undefined) {
            height = width;
        }

        this.iconWidth = width;
        this.iconHeight = height;

        return this;
    }

    get texture() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.texture;
    }

    get frame() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.frame;
    }

    setActionTexture(key, frame) {
        var imageObject = this.childrenMap.action;
        if (imageObject === undefined) {
            return this;
        }
        imageObject.setTexture(key, frame);

        if (this.actionWidth !== undefined) {
            SetDisplaySize(imageObject, this.actionWidth, this.actionHeight);
            this.resetChildScaleState(imageObject);
        }

        return this;
    }

    get actionTexture() {
        var imageObject = this.childrenMap.action;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.texture;
    }

    get actionFrame() {
        var imageObject = this.childrenMap.action;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.frame;
    }

    setActionSize(width, height) {
        if (height === undefined) {
            height = width;
        }

        this.actionWidth = width;
        this.actionHeight = height;

        return this;
    }

    preLayout() {
        var icon = this.childrenMap.icon;
        if (icon && (this.iconWidth !== undefined)) {
            SetDisplaySize(icon, this.iconWidth, this.iconHeight);
        }

        var action = this.childrenMap.action;
        if (action && (this.actionWidth !== undefined)) {
            SetDisplaySize(action, this.actionWidth, this.actionHeight);
        }

        super.preLayout();
    }

    runLayout(parent, newWidth, newHeight) {
        if (this.ignoreLayout) {
            return this;
        }

        super.runLayout(parent, newWidth, newHeight);
        // Pin icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
            iconMask.setPosition();
            this.resetChildPositionState(iconMask);
        }
        // Pin action-mask to action game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
            actionMask.setPosition();
            this.resetChildPositionState(actionMask);
        }
        return this;
    }

    resize(width, height) {
        super.resize(width, height);
        // Resize icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
            iconMask.resize();
        }
        // Resize action-mask to icon game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
            actionMask.resize();
        }
        return this;
    }
}

Object.assign(
    Label.prototype,
    Methods,
)

export default Label;