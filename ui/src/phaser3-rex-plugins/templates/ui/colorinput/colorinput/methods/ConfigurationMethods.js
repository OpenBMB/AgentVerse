var methods = {
    // Color picker
    setCreateColorPickerBackgroundCallback(callback) {
        this.colorPickerCreateBackgroundCallback = callback;
        return this;
    },

    setColorPickerHPalettePosition(position) {
        this.colorPickerHPalettePosition = position;
        return this;
    },

    setColorPickerExpandDirection(direction) {
        if (typeof (direction) === 'string') {
            direction = ColorPickerExpandDirections[direction];
        }
        this.colorPickerExpandDirection = direction;
        return this;
    },

    setColorPickerEaseInDuration(duration) {
        if (duration === undefined) {
            duration = 0;
        }
        this.colorPickerEaseInDuration = duration;
        return this;
    },

    setColorPickerEaseOutDuration(duration) {
        if (duration === undefined) {
            duration = 0;
        }
        this.colorPickerEaseOutDuration = duration;
        return this;
    },

    setColorPickerTransitInCallback(callback) {
        this.colorPickerTransitInCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    },

    setColorPickerTransitOutCallback(callback) {
        this.colorPickerTransitOutCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    },

    setColorPickerBounds(bounds) {
        this.colorPickerBounds = bounds;
        return this;
    },

    setColorPickerWidth(width) {
        this.colorPickerWidth = width;
        return this;
    },

    setColorPickerHeight(height) {
        this.colorPickerHeight = height;
        return this;
    },

    setColorPickerSize(width, height) {
        this.setColorPickerWidth(width).setColorPickerHeight(height);
        return this;
    },

    setColorPickerSpace(space) {
        if (space === undefined) {
            space = {};
        }
        this.colorPickerSpace = space;
        return this;
    },

    // Color components
    setColorComponentsHeight(height) {
        this.colorComponentsHeight = height;
        return this;
    },

    setColorComponentsFormatLabelConfig(config) {
        this.colorComponentsFormatLabelConfig = config;
        return this;
    },

    setColorComponentsInputTextConfig(config) {
        this.colorComponentsInputTextConfig = config;
        return this;
    },

    setColorComponentsSpace(space) {
        if (space === undefined) {
            space = {};
        }
        this.colorComponentsSpace = space;
        return this;
    },
}

const ColorPickerExpandDirections = {
    down: 0,
    up: 1
}

export default methods;