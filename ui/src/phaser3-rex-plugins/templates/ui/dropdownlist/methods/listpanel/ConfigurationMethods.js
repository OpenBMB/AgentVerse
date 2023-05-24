var methods = {
    setWrapEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.listWrapEnable = enable;
        return this;
    },

    setCreateButtonCallback(callback) {
        this.listCreateButtonCallback = callback;
        return this;
    },

    setCreateListBackgroundCallback(callback) {
        this.listCreateBackgroundCallback = callback;
        return this;
    },

    setButtonClickCallback(callback) {
        this.listOnButtonClick = callback;
        return this;
    },

    setButtonOverCallback(callback) {
        this.listOnButtonOver = callback;
        return this;
    },

    setButtonOutCallback(callback) {
        this.listOnButtonOut = callback;
        return this;
    },

    setListExpandDirection(direction) {
        if (typeof (direction) === 'string') {
            direction = ListExpandDirections[direction];
        }
        this.listExpandDirection = direction;
        return this;
    },

    setListEaseInDuration(duration) {
        if (duration === undefined) {
            duration = 0;
        }
        this.listEaseInDuration = duration;
        return this;
    },

    setListEaseOutDuration(duration) {
        if (duration === undefined) {
            duration = 0;
        }
        this.listEaseOutDuration = duration;
        return this;
    },

    setListTransitInCallback(callback) {
        this.listTransitInCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    },

    settListTransitOutCallback(callback) {
        this.listTransitOutCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    },

    setListBounds(bounds) {
        this.listBounds = bounds;
        return this;
    },

    setListWidth(width) {
        this.listWidth = width;
        return this;
    },

    setListHeight(height) {
        this.listHeight = height;
        return this;
    },

    setListSize(width, height) {
        this.setListWidth(width).setListHeight(height);
        return this;
    },

    setListAlignmentMode(mode) {
        this.listAlignMode = mode;
        return this;
    },

    setListAlignmentSide(side) {
        if (side === undefined) {
            side = '';
        }

        this.listAlignSide = side;
        return this;
    },

    setListSpace(space) {
        if (space === undefined) {
            space = {};
        }
        this.listSpace = space;
        return this;
    },

    setListDraggable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.listDraggable = enable;
        return this;
    },

}

const ListExpandDirections = {
    down: 0,
    up: 1
}

export default methods;