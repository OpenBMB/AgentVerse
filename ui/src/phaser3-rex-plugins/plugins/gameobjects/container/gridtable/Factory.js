import GridTable from './GridTable.js';

export default function (x, y, width, height, config) {
    var gameObject = new GridTable(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};