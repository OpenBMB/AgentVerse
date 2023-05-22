import Anchor from '../anchor/Anchor.js';

var SetAnchor = function (config) {
    if (config === undefined) {
        config = {};
    }

    // Assign default onResizeCallback if not given    
    var hasMinWidth = config.hasOwnProperty('width');
    var hasMinHeight = config.hasOwnProperty('height');
    var hasOnResizeCallback = config.hasOwnProperty('onResizeCallback');
    if ((hasMinWidth || hasMinHeight) && !hasOnResizeCallback) {
        config.onResizeCallback = function (width, height, sizer) {
            if (hasMinWidth) {
                sizer.setMinWidth(width);
            }

            if (hasMinHeight) {
                sizer.setMinHeight(height);
            }

            sizer.layout();
        }
    }

    if (this._anchor === undefined) {
        this._anchor = new Anchor(this, config);
    } else {
        this._anchor.resetFromJSON(config)
    }
    return this;
}

export default SetAnchor;