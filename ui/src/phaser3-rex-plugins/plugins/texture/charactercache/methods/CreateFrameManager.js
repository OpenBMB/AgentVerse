import CanvasFrameManager from '../../canvasframemanager/CanvasFrameManager.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateFrameManager = function (scene, config) {
    var key = GetValue(config, 'key');
    var cellWidth = GetValue(config, 'cellWidth', 32);
    var cellHeight = GetValue(config, 'cellHeight', 32);
    var maxCharacterCount = GetValue(config, 'maxCharacterCount', 4096);

    var colCount = Math.ceil(Math.sqrt(maxCharacterCount));
    var rowCount = colCount;
    var width = cellWidth * colCount;
    var height = cellHeight * rowCount;

    var frameManager = new CanvasFrameManager(scene, key, width, height, cellWidth, cellHeight);
    return frameManager;
}

export default CreateFrameManager;