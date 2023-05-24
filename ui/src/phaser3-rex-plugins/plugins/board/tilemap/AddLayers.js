import IsGameObject from '../../utils/system/IsGameObject.js';

var AddLayers = function (board, tilemap, layers) {
    if (layers === undefined) {
        layers = tilemap.layers;
    } else if (!Array.isArray(layers)) {
        layers = [layers];
    }

    for (var i = 0, cnt = layers.length; i < cnt; i++) {
        var layer = layers[i];
        if (typeof (layer) === 'string') {
            layer = tilemap.getLayer(layer);
        }
        if (IsGameObject(layer)) {
            layer = layer.layer;
        }

        AddLayer(board, layer);
    }
}

var AddLayer = function (board, layer) {
    var tileZ = layer.name;
    var layerData = layer.data;
    for (var y = 0, ycnt = layerData.length; y < ycnt; y++) {
        var layerRow = layerData[y];
        for (var x = 0, xcnt = layerRow.length; x < xcnt; x++) {
            var tile = layerRow[x];
            board.addChess(tile, x, y, tileZ, false);
        }
    }
}

export default AddLayers;