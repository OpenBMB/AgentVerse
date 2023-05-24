import Draw from '../../../utils/bounds/DrawBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var DrawBounds = function (graphics, config) {
    var drawContainer = GetValue(config, 'drawContainer', true);

    var gameObjects = GetValue(config, 'children');
    if (gameObjects === undefined) {
        gameObjects = this.getAllVisibleChildren([this]);
    }

    if (!drawContainer) {
        gameObjects = gameObjects.filter(function (gameObject) {
            return !gameObject.isRexContainerLite;
        })
    }

    Draw(gameObjects, graphics, config);

    return this;
}

export default DrawBounds;