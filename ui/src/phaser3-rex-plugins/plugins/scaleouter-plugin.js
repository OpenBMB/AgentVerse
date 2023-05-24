import ScaleOuter from "./scaleouter.js";

class ScaleOuterPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);
        this.scaleOuter = new ScaleOuter(scene);
    }

    start() {
        var eventEmitter = this.scene.sys.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        this.scaleOuter.destroy();
        this.scaleOuter = undefined;
        super.destroy();
    }

    add(camera) {
        this.scaleOuter.add(camera);
        return this;
    }

    scale() {
        if (this.scaleOuter.cameras.size === 0) {
            // Add default camera
            this.add(this.scene.sys.cameras.main);
        }
        this.scaleOuter.scale();
        return this;
    }

    stop() {
        this.scaleOuter.stop();
        return this;
    }

    get scrollX() {
        return this.scaleOuter.scrollX;
    }

    get scrollY() {
        return this.scaleOuter.scrollY;
    }

    get zoom() {
        return this.scaleOuter.zoom;
    }

    get innerViewport() {
        return this.scaleOuter.innerViewport;
    }

    get outerViewport() {
        return this.scaleOuter.outerViewport;
    }

    getShrinkedOuterViewport(maxRatio, minRatio, out) {
        return this.scaleOuter.getShrinkedOuterViewport(maxRatio, minRatio, out);
    }
}

export default ScaleOuterPlugin;
