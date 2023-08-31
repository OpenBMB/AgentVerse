import Snapshot from '../../../utils/rendertexture/Snapshot.js';

export default {
    snapshot(config) {
        // Save scale
        var scaleXSave = this.scaleX;
        var scaleYSave = this.scaleY;
        var scale1 = (scaleXSave === 1) && (scaleYSave === 1);
        if (!scale1) {
            this.setScale(1);
        }

        // Snapshot with scale = 1
        if (config === undefined) {
            config = {};
        }
        config.gameObjects = this.getAllVisibleChildren();
        config.x = this.x;
        config.y = this.y;
        config.originX = this.originX;
        config.originY = this.originY;
        var rt = Snapshot(config);
        var isValidRT = !!rt.scene;

        // Restore scale
        if (!scale1) {
            this.setScale(scaleXSave, scaleYSave);

            if (isValidRT) {
                rt.setScale(scaleXSave, scaleYSave);
            }
        }

        return (isValidRT) ? rt : this;
    }
}