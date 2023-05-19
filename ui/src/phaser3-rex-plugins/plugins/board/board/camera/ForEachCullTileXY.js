import GetValue from '../../../utils/object/GetValue.js';
import Rectangle from '../../../utils/geom/rectangle/Rectangle.js';

var ForEachCullTileXY = function (callback, scope, config) {
    if (typeof (config) === 'number') {
        config = {
            order: config
        }
    }

    if (config === undefined) {
        config = {};
    }

    var order = GetValue(config, 'order', 0);

    var camera = GetValue(config, 'camera', this.scene.cameras.main);
    var paddingX = GetValue(config, 'paddingX', 1);
    var paddingY = GetValue(config, 'paddingY', 1);

    if (ViewportBounds === undefined) {
        ViewportBounds = new Rectangle();
    }
    ViewportBounds.width = (camera.width + paddingX * 2) / camera.zoomX;
    ViewportBounds.height = (camera.height + paddingY * 2) / camera.zoomY;
    ViewportBounds.centerX = camera.centerX + camera.scrollX;
    ViewportBounds.centerY = camera.centerY + camera.scrollY;

    this.forEachTileXYInShape(
        ViewportBounds,
        callback,
        scope,
        {
            order: order,
            testMode: 1
        }
    );

    return this;
}

var ViewportBounds;

export default ForEachCullTileXY;