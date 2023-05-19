import GridSizer from '../gridsizer/GridSizer.js';

const SizerAdd = GridSizer.prototype.add;

export default {
    addButton(gameObject, columnIndex, rowIndex) {
        SizerAdd.call(this, gameObject, columnIndex, rowIndex, undefined, 0, this.buttonsExpand);
        this.buttonGroup.add(gameObject);
        return this;
    },

    addButtons(gameObjects, rowThenColumn) {
        for (var i = 0, cnt = gameObjects; i < cnt; i++) {
            this.addButton(gameObjects[i], undefined, rowThenColumn);
        }
        return this;
    }
}