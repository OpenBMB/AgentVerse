import MaskChildren from './MaskChildren.js';
import AddChildMask from './AddChildMask.js';
import MaskToGameObject from '../../../../utils/mask/MaskToGameObject.js'

const GetValue = Phaser.Utils.Objects.GetValue;

const MASKUPDATEMODE = {
    update: 0,
    everyTick: 1
};

export default {
    setupChildrenMask(config) {
        if (config === false) {
            // No children mask
            return this;
        }

        this.setMaskUpdateMode(GetValue(config, 'updateMode', 0));
        this.enableChildrenMask(GetValue(config, 'padding', 0));
        this.setMaskLayer(GetValue(config, 'layer', undefined));
        this.startMaskUpdate();

        return this;
    },

    destroyChildrenMask() {
        if (!this.childrenMask) {
            return this;
        }

        this.stopMaskUpdate();
        this.childrenMask.destroy();
        this.childrenMask = undefined;

        return this;
    },

    setMaskUpdateMode(mode) {
        if (typeof (mode) === 'string') {
            mode = MASKUPDATEMODE[mode];
        }
        this.maskUpdateMode = mode;
        return this;
    },

    startMaskUpdate() {
        this.scene.game.events.on('poststep', this.maskChildren, this);
    },

    stopMaskUpdate() {
        this.scene.game.events.off('poststep', this.maskChildren, this);
    },

    enableChildrenMask(maskPadding) {
        var maskGameObject = AddChildMask.call(this, null, this, 0, maskPadding);
        this.childrenMask = maskGameObject.createGeometryMask();
        // this.childrenMask is a mask object, not a (Graphics) game object
        return this;
    },

    setMaskChildrenFlag(value) {
        if (value === undefined) {
            value = true;
        }
        this.maskChildrenFlag = value;
        return this;
    },

    setMaskLayer(layer) {
        // To reduce amount of masked game object
        this.maskLayer = layer;
        return this;
    },

    maskChildren() {
        if (
            (!this.childrenMask) ||                // No childrenMask
            (!this.maskChildrenFlag) ||            // No maskChildrenFlag set
            (this.alpha === 0) || (!this.visible)  // Parent is not visible
        ) {
            return this;
        }

        if (this.privateRenderLayer) {
            this.privateRenderLayer.setMask(this.childrenMask);
        } else if (this.maskLayer) {
            // 1. Add parent and children into layer
            this.addToLayer(this.maskLayer);
            // 2. Mask this layer
            this.maskLayer.setMask(this.childrenMask);
        } else {
            MaskChildren(this, this.childrenMask);
        }

        if (this.maskUpdateMode === 0) {
            this.maskChildrenFlag = false;
        }
        return this;
    },

    layoutChildrenMask() {
        if (!this.childrenMask) {
            return this;
        }

        var maskGameObject = MaskToGameObject(this.childrenMask);
        maskGameObject.setPosition().resize();
        this.resetChildPositionState(maskGameObject);
        return this;
    }
};