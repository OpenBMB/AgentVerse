import { PerspectiveCard } from '../../../plugins/perspectiveimage.js';
import Clone from '../../../plugins/utils/object/Clone.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreatePerspectiveCardMesh = function (config) {
    var scene = this.scene;

    this.setSnapshotPadding(GetValue(config, 'snapshotPadding', 0));

    config = Clone(config);
    // Remove size config
    delete config.width;
    delete config.height;
    // Initial size of render-texture is 1x1
    config.front = { width: 1, height: 1 };
    config.back = { width: 1, height: 1 };
    // Create PerspectiveCard as card-behavior
    var card = new PerspectiveCard(scene, config);
    scene.add.existing(card);

    var flip = card.flip;
    if (flip) {
        var parent = this;
        flip
            .on('start', function () {
                // Before flipping
                parent.enterPerspectiveMode();
            })
            .on('complete', function () {
                // After flipping
                parent.exitPerspectiveMode();
            })
    }

    return card;
}

export default CreatePerspectiveCardMesh;