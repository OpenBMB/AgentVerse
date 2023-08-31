import GridCut from '../utils/texture/gridcut/GridCut.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DefaultImageClass = Phaser.GameObjects.Image;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const RotateAround = Phaser.Math.RotateAround;

var GridCutImage = function (gameObject, columns, rows, config) {
    if (IsPlainObject(columns)) {
        config = columns;
        columns = GetValue(config, 'columns', 1);
        rows = GetValue(config, 'rows', 1);
    }

    var createImageCallback = GetValue(config, 'onCreateImage');
    if (!createImageCallback) {
        var ImageClass = GetValue(config, 'ImageClass', DefaultImageClass);
        createImageCallback = function (scene, key, frame) {
            return new ImageClass(scene, 0, 0, key, frame);
        }
    }

    var originX = GetValue(config, 'originX', 0.5);
    var originY = GetValue(config, 'originY', 0.5);
    var addToScene = GetValue(config, 'add', true);
    var align = GetValue(config, 'align', addToScene);
    var imageObjectPool = GetValue(config, 'objectPool', undefined);

    var scene = gameObject.scene;
    var texture = gameObject.texture;
    var frame = gameObject.frame;

    var result = GridCut(scene, texture, frame, columns, rows);
    var getFrameNameCallback = result.getFrameNameCallback;
    var scaleX = gameObject.scaleX,
        scaleY = gameObject.scaleY;
    var rotation = gameObject.rotation;
    var topLeft = gameObject.getTopLeft(),
        startX = topLeft.x,
        startY = topLeft.y;

    var cellGameObjects = [];
    var cellWidth = result.cellWidth * scaleX,
        cellHeight = result.cellHeight * scaleY;
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < columns; x++) {
            var cellGameObject;

            var frameName = getFrameNameCallback(x, y);
            if (imageObjectPool && (imageObjectPool.length > 0)) {
                cellGameObject = (imageObjectPool.pop()).setTexture(texture, frameName);
            } else {
                cellGameObject = createImageCallback(scene, texture, frameName);
            }

            if (addToScene) {
                scene.add.existing(cellGameObject);
            }

            var cellTLX = startX + (cellWidth * x);
            var cellTLY = startY + (cellHeight * y);
            var cellX = cellTLX + (originX * cellWidth);
            var cellY = cellTLY + (originY * cellHeight);

            if (align) {
                cellGameObject
                    .setOrigin(originX, originY)
                    .setPosition(cellX, cellY)
                    .setScale(scaleX, scaleY)
                    .setRotation(rotation);
                RotateAround(cellGameObject, startX, startY, rotation);
            }

            cellGameObjects.push(cellGameObject);
        }
    }

    return cellGameObjects;
}

export default GridCutImage;