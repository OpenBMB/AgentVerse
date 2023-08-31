import NOOP from '../object/NOOP.js';
var globZone = new Phaser.GameObjects.Zone({
    sys: {
        queueDepthSort: NOOP,
        events: {
            once: NOOP
        }
    }
}, 0, 0, 1, 1);
globZone.setOrigin(0);

export default globZone;