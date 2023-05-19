import DataMethods from '../../../../utils/data/DataMethods.js';
import AlignConst from '../../../../utils/actions/AlignConst.js';

class Cell {
    constructor(parent, config) {
        this.container = null;
        this._deltaHeight = 0;
        this.setParent(parent);
        // this.resetFromJSON(config);
    }

    setParent(parent) {
        this.parent = parent; // parent: table
        this.parentContainer = parent.getParentContainer();
    }

    // resetFromJSON(o) {
    //     return this;
    // }

    destroy(fromScene) {
        if (fromScene === undefined) {
            fromScene = false;
        }

        if (!fromScene) {
            this.destroyContainer();
        }

        this.deltaHeight = 0;
        this.data = undefined;
        this.container = null;
        this.parent = undefined;
        this.parentContainer = undefined;
    }

    get table() {
        return this.parent;
    }

    get scrollMode() {
        return this.parentContainer.scrollMode;
    }

    get colIndx() {
        return this.parent.cellIndxeToColIndex(this.index);
    }

    get rowIndx() {
        return this.parent.cellIndxeToRowIndex(this.index);
    }

    getContainer() {
        return this.container;
    }

    setContainer(container) {
        if (!container) {
            this.destroyContainer();
            return this;
        }

        if (this.container) {
            this.container.destroy();
        }
        this.container = container;
        this.parentContainer.add(container);
        return this;
    }

    destroyContainer() {
        if (this.container) {
            this.container.destroy();
            this.container = null;
        }
        return this;
    }

    popContainer() {
        if (this.container) {
            var container = this.container;
            this.container = null;
            this.parentContainer.remove(container);
            return container;
        } else {
            return null;
        }
    }

    setXY(x, y) {
        if (this.container) {
            this.parentContainer.setChildLocalPosition(this.container, x, y);
        }
        return this;
    }

    setCellContainerAlign(align) {
        if (typeof (align) === 'string') {
            align = AlignConst[align];
        }
        this.cellContainerAlign = align;
        return this;
    }

    get deltaHeight() {
        return this._deltaHeight;
    }

    set deltaHeight(deltaHeight) {
        if (deltaHeight == null) {
            deltaHeight = 0;
        }
        var table = this.parent;
        if ((this._deltaHeight === 0) && (deltaHeight !== 0)) {
            table.nonZeroDeltaHeightCount++;
        } else if ((this._deltaHeight !== 0) && (deltaHeight === 0)) {
            table.nonZeroDeltaHeightCount--;
        }

        var isTableHeightChanged = (this._deltaHeight !== deltaHeight);

        this._deltaHeight = deltaHeight;

        if (isTableHeightChanged) {
            table.resetTotalRowsHeight();
            var eventName = (this.scrollMode === 0) ? 'cellheightchange' : 'cellwidthchange';
            this.parentContainer.emit(eventName, this, this.container, this.parentContainer);
        }
    }

    get deltaWidth() {
        return this.deltaHeight;
    }

    set deltaWidth(deltaWidth) {
        this.deltaHeight = deltaWidth;
    }

    setDeltaHeight(deltaHeight) {
        this.deltaHeight = deltaHeight;
        return this;
    }

    setDeltaWidth(deltaWidth) {
        this.deltaHeight = deltaWidth;
        return this;
    }

    get height() {
        if (this.scrollMode === 0) {
            return this.deltaHeight + this.parent.defaultCellHeight;
        } else {
            return this.parent.defaultCellWidth;
        }
    }

    set height(height) {
        // Only worked when scrollMode is 0
        if (this.scrollMode === 1) {
            return;
        }
        this.setDeltaHeight(height - this.parent.defaultCellHeight);
    }

    setHeight(height) {
        // Only worked when scrollMode is 0
        this.height = height;
        return this;
    }

    get width() {
        if (this.scrollMode === 0) {
            return this.parent.defaultCellWidth;
        } else {
            return this.deltaHeight + this.parent.defaultCellHeight;
        }
    }

    set width(width) {
        // Only worked when scrollMode is 1
        if (this.scrollMode === 0) {
            return;
        }
        this.setDeltaHeight(width - this.parent.defaultCellHeight);
    }

    setWidth(width) {
        this.width = width;
        return this;
    }

    get scene() {
        return this.parentContainer.scene;
    }
};


Object.assign(
    Cell.prototype,
    DataMethods
);


export default Cell;