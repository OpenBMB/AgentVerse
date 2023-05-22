import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import GetViewport from '../../utils/system/GetViewport.js';

class Anchor extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, { eventEmitter: false });
        // No event emitter
        // this.parent = gameObject;

        this.viewport = undefined;
        this.resetFromJSON(config);
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.autoAnchor(false);

        this.viewport = undefined;
        this.onUpdateViewportCallback = undefined;
        this.onUpdateViewportCallbackScope = undefined;
        this.onResizeCallback = undefined;
        this.onResizeCallbackScope = undefined;

        super.shutdown(fromScene);
    }

    resetFromJSON(o) {
        if (o === undefined) {
            o = {};
        }

        // Position
        var alignX, configX;
        if (o.x !== undefined) {
            alignX = null;
            configX = o.x;
        } else if (o.left !== undefined) {
            alignX = 0;
            configX = o.left;
        } else if (o.right !== undefined) {
            alignX = 1;
            configX = o.right;
        } else if (o.centerX !== undefined) {
            alignX = 0.5;
            configX = o.centerX;
        }

        var alignY, configY;
        if (o.y !== undefined) {
            alignY = null;
            configY = o.y;
        } else if (o.top !== undefined) {
            alignY = 0;
            configY = o.top;
        } else if (o.bottom !== undefined) {
            alignY = 1;
            configY = o.bottom;
        } else if (o.centerY !== undefined) {
            alignY = 0.5;
            configY = o.centerY;
        }

        var percentageX, offsetX;
        if (configX !== undefined) {
            configX = configX.replace('left', '0%').replace('right', '100%').replace('center', '50%').split('%');
            percentageX = parseFloat(configX[0]) / 100;
            offsetX = (configX[1] === '') ? 0 : parseFloat(configX[1]);
        }
        var percentageY, offsetY;
        if (configY !== undefined) {
            configY = configY.replace('top', '0%').replace('bottom', '100%').replace('center', '50%').split('%');
            percentageY = parseFloat(configY[0]) / 100;
            offsetY = (configY[1] === '') ? 0 : parseFloat(configY[1]);
        }

        // Size
        var configWidth = o.width;
        var percentageWidth, paddingWidth;
        if (configWidth !== undefined) {
            configWidth = configWidth.split('%');
            percentageWidth = parseFloat(configWidth[0]) / 100;
            paddingWidth = (configWidth[1] === '') ? 0 : parseFloat(configWidth[1]);
        }

        var configHeight = o.height;
        var percentageHeight, paddingHeight;
        if (configHeight !== undefined) {
            configHeight = configHeight.split('%');
            percentageHeight = parseFloat(configHeight[0]) / 100;
            paddingHeight = (configHeight[1] === '') ? 0 : parseFloat(configHeight[1]);
        }

        // Position
        this.setAlign(alignX, alignY);
        this.setPercentage(percentageX, percentageY);
        this.setOffset(offsetX, offsetY);
        // Size
        this.setSizePercentage(percentageWidth, percentageHeight);
        this.setSizePadding(paddingWidth, paddingHeight);

        var onResizeCallback = o.onResizeCallback;
        var onResizeCallbackScope = o.onResizeCallbackScope;
        if (onResizeCallback !== undefined) {
            this.setResizeCallback(onResizeCallback, onResizeCallbackScope);
        }

        var onUpdateViewportCallback = o.onUpdateViewportCallback;
        var onUpdateViewportCallbackScope = o.onUpdateViewportCallbackScope;
        if (onUpdateViewportCallback !== undefined) {
            this.setUpdateViewportCallback(onUpdateViewportCallback, onUpdateViewportCallbackScope);
        }

        this.autoAnchor(o.enable);

        return this;
    }

    autoAnchor(enable) {
        if (enable === undefined) {
            enable = true;
        }

        enable = !!enable;
        if (this.autoAnchorEnable === enable) {
            return this;
        }

        if (enable) {
            this.scene.sys.scale.on('resize', this.anchor, this);
            this.anchor();
        } else {
            this.scene.sys.scale.off('resize', this.anchor, this);
        }

        this.autoAnchorEnable = enable;

        return this;
    }

    // Position
    setAlign(x, y) {
        this.alignX = x;
        this.alignY = y;
        return this;
    }

    setPercentage(x, y) {
        this.percentageX = x;
        this.percentageY = y;
        return this;
    }

    setOffset(x, y) {
        this.offsetX = x;
        this.offsetY = y;
        return this;
    }

    // Size
    setSizePercentage(width, height) {
        this.percentageWidth = width;
        this.percentageHeight = height;
        return this;
    }

    setSizePadding(width, height) {
        this.paddingWidth = width;
        this.paddingHeight = height;
        return this;
    }

    setResizeCallback(callback, scope) {
        this.onResizeCallback = callback;
        this.onResizeCallbackScope = scope;
        return this;
    }

    setUpdateViewportCallback(callback, scope) {
        this.onUpdateViewportCallback = callback;
        this.onUpdateViewportCallbackScope = scope;
        return this;
    }

    anchor() {
        this.updateViewport();
        this.updateSize();
        this.updatePosition();
        return this;
    }

    updateSize() {
        var callback = this.onResizeCallback,
            scope = this.onResizeCallbackScope;
        var newWidth = this.anchorWidth,
            newHeight = this.anchorHeight;
        if (((newWidth === undefined) && (newHeight === undefined)) || !callback) {
            return;
        }

        var gameObject = this.parent;
        if (newWidth === undefined) {
            newWidth = gameObject.width;
        }
        if (newHeight === undefined) {
            newHeight = gameObject.height;
        }

        if (scope) {
            callback.call(scope, newWidth, newHeight, gameObject, this);
        } else {
            callback(newWidth, newHeight, gameObject, this);
        }
    }

    updatePosition() {
        var gameObject = this.parent;

        if (this.alignX === null) {
            gameObject.x = this.anchorX;
        } else if (this.alignX !== undefined) {
            gameObject.x = this.anchorX + (gameObject.displayWidth * (gameObject.originX - this.alignX));
        }

        if (this.alignY === null) {
            gameObject.y = this.anchorY;
        } else if (this.alignY !== undefined) {
            gameObject.y = this.anchorY + (gameObject.displayHeight * (gameObject.originY - this.alignY));
        }

        return this;
    }

    get anchorX() {
        return this.viewport.x + (this.viewport.width * this.percentageX) + this.offsetX;
    }

    get anchorY() {
        return this.viewport.y + (this.viewport.height * this.percentageY) + this.offsetY;
    }

    get anchorWidth() {
        if (this.percentageWidth === undefined) {
            return undefined;
        }
        return (this.viewport.width * this.percentageWidth) + this.paddingWidth;
    }

    get anchorHeight() {
        if (this.percentageHeight === undefined) {
            return undefined;
        }
        return (this.viewport.height * this.percentageHeight) + this.paddingHeight;
    }

    updateViewport() {
        var camera = this.parent.scene.cameras.main;
        this.viewport = GetViewport(this.scene, camera, this.viewport);

        var viewport = this.viewport;
        var callback = this.onUpdateViewportCallback,
            scope = this.onUpdateViewportCallbackScope;
        if (callback) {
            if (scope) {
                callback.call(scope, viewport, this.parent, this);
            } else {
                callback(viewport, this.parent, this);
            }
        }
    }
}

export default Anchor;