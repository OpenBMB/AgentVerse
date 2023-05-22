import GetPartialData from '../../../../plugins/utils/object/GetPartialData.js';
import IsKeyValueEqual from '../../../../plugins/utils/object/IsKeyValueEqual.js';

var ApplyStyle = function (gameObject, newStyle) {
    if (!newStyle) {
        return undefined;
    }

    var currentStyle = GetPartialData(gameObject, newStyle);
    if (!IsKeyValueEqual(currentStyle, newStyle)) {
        gameObject.modifyStyle(newStyle);
        return currentStyle;
    } else {
        return undefined;
    }
}

export default {
    setActiveState(enable) {
        if (enable === undefined) {
            enable = true;
        }

        if (this.activeState === enable) {
            return this;
        }

        this.activeState = enable;

        if (enable) {
            this.activeStyleSave = ApplyStyle(this, this.activeStyle);
        } else {
            ApplyStyle(this, this.activeStyleSave);
            this.activeStyleSave = undefined;
        }

        return this;
    },

    setHoverState(enable) {
        if (enable === undefined) {
            enable = true;
        }

        if (this.hoverState === enable) {
            return this;
        }

        this.hoverState = enable;

        if (enable) {
            this.hoverStyleSave = ApplyStyle(this, this.hoverStyle);
        } else {
            ApplyStyle(this, this.hoverStyleSave);
            this.hoverStyleSave = undefined;
        }

        return this;
    },

    setDisableState(enable) {
        if (enable === undefined) {
            enable = true;
        }

        if (this.disableState === enable) {
            return this;
        }

        this.disableState = enable;

        if (enable) {
            this.disableStyleSave = ApplyStyle(this, this.disableStyle);
        } else {
            ApplyStyle(this, this.disableStyleSave);
            this.disableStyleSave = undefined;
        }

        return this;
    }
}