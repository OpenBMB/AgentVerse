import GetBoundsOfGameObjects from '../bounds/GetBoundsOfGameObjects.js';
import Clone from '../object/Clone.js';
import SortGameObjectsByDepth from '../system/SortGameObjectsByDepth.js';
import IsGameObject from '../system/IsGameObject.js';

var GetValue = Phaser.Utils.Objects.GetValue;
var DynamicTexture = Phaser.Textures.DynamicTexture;
var UUID = Phaser.Utils.String.UUID;

var Snapshot = function (config) {
    if (!config) {
        return;
    }

    var gameObjects = config.gameObjects;
    var renderTexture = config.renderTexture;  // renderTexture, or dynamicTexture
    var x = GetValue(config, 'x', undefined);
    var y = GetValue(config, 'y', undefined);
    var width = GetValue(config, 'width', undefined);
    var height = GetValue(config, 'height', undefined);
    var originX = GetValue(config, 'originX', 0);
    var originY = GetValue(config, 'originY', 0);
    var padding = GetValue(config, 'padding', 0);
    var scrollX, scrollY;
    if ((width === undefined) || (height === undefined) || (x === undefined) || (y === undefined)) {
        // Union bounds of gameObjects
        var bounds = GetBoundsOfGameObjects(gameObjects, true);
        var isCenterOrigin = (x !== undefined) && (y !== undefined);
        if (isCenterOrigin) {
            width = Math.max((x - bounds.left), (bounds.right - x)) * 2;
            height = Math.max((y - bounds.top), (bounds.bottom - y)) * 2;
            originX = 0.5;
            originY = 0.5;
        } else {
            x = bounds.x;
            y = bounds.y;
            width = bounds.width;
            height = bounds.height;
            originX = 0;
            originY = 0;
        }
        scrollX = bounds.x;
        scrollY = bounds.y;
    } else {
        scrollX = x + ((0 - originX) * width);
        scrollY = y + ((0 - originY) * height);
    }

    scrollX -= padding;
    scrollY -= padding;
    width += (padding * 2);
    height += (padding * 2);

    var scene = gameObjects[0].scene;

    // Snapshot on dynamicTexture directly
    if (saveTexture && !renderTexture) {
        renderTexture = new DynamicTexture(scene.sys.textures, UUID(), width, height);
    }

    // Return a renderTexture
    if (!renderTexture) {
        renderTexture = scene.add.renderTexture(0, 0, width, height);
    }

    if (renderTexture.setPosition) {
        renderTexture.setPosition(x, y);
    }

    if ((renderTexture.width !== width) || (renderTexture.height !== height)) {
        renderTexture.setSize(width, height);
    }

    if (renderTexture.setOrigin) {
        renderTexture.setOrigin(originX, originY);
    }

    renderTexture.camera.setScroll(scrollX, scrollY);

    // Draw gameObjects
    gameObjects = SortGameObjectsByDepth(Clone(gameObjects));
    renderTexture.draw(gameObjects);

    // Save render result to texture    
    var saveTexture = config.saveTexture;
    if (saveTexture) {
        if (IsGameObject(renderTexture)) {
            renderTexture.saveTexture(saveTexture);
        } else {
            var dynamicTexture = renderTexture;
            var textureManager = dynamicTexture.manager;
            if (textureManager.exists(dynamicTexture.key)) {
                // Rename texture
                textureManager.renameTexture(dynamicTexture.key, key);
            } else {
                // Add texture to texture manager
                dynamicTexture.key = key;
                textureManager.list[key] = dynamicTexture;
                textureManager.emit('addtexture', key, dynamicTexture);
                textureManager.emit(`addtexture-${key}`, dynamicTexture);
            }
        }
    }

    return renderTexture;
}

export default Snapshot;