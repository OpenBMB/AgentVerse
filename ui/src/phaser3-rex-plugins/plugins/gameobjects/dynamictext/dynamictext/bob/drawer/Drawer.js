import RenderBase from '../renderbase/RenderBase.js';
import { DrawerTypeName } from '../Types.js';

class Drawer extends RenderBase {
    constructor(parent, renderCallback, width, height) {
        super(parent, DrawerTypeName);

        this.setRenderCallback(renderCallback);
        this.setDrawerSize(width, height);
    }

    setRenderCallback(callback) {
        if (callback) {
            this.renderContent = callback.bind(this);
        } else {
            delete this.renderContent;
        }
        return this;
    }

    setDrawerSize(width, height) {
        // Whole canvas
        if (width === true) {
            this.toLocalPosition = false;
            width = undefined;
            height = undefined;
        } else {
            this.toLocalPosition = true;
        }

        if (width === undefined) {
            width = 0;
        }
        if (height === undefined) {
            height = width;
        }

        this.drawerWidth = width;
        this.drawerHeight = height;

        return this;
    }

    onFree() {
        super.onFree();
        this
            .setRenderCallback()
    }

    get width() {
        return this.drawerWidth * this.scaleX;
    }

    set width(value) {
        this.setDirty(this.width !== value);
        this.scaleX = (this.drawerWidth > 0) ? value / this.drawerWidth : 1;
    }

    get height() {
        return this.drawerHeight * this.scaleY;
    }

    set height(value) {
        this.setDirty(this.height !== value);
        this.scaleY = (this.drawerHeight > 0) ? value / this.drawerHeight : 1;
    }

    get offsetY() {
        return -this.height;
    }

    set offsetY(value) { }

    get drawTLX() { return -this.leftSpace; }
    get drawTLY() { return 0; }
    get drawBLX() { return -this.leftSpace; }
    get drawBLY() { return this.drawerHeight; }
    get drawTRX() { return this.drawerWidth + this.rightSpace; }
    get drawTRY() { return 0; }
    get drawBRX() { return this.drawerWidth + this.rightSpace; }
    get drawBRY() { return this.drawerHeight; }

}

export default Drawer;