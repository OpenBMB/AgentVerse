import CheckScaleMode from './CheckScaleMode.js';
import GetScaleOutCameraParameters from './GetScaleOuterCameraParameters.js';
import GetInnerViewport from './GetInnerViewport.js';
import GetOuterViewport from './GetOuterViewport.js';
import ShrinkSizeByRatio from './ShrinkSizeByRatio.js'

const Rectangle = Phaser.Geom.Rectangle;
const CopyRectangle = Phaser.Geom.Rectangle.CopyFrom
const SetStruct = Phaser.Structs.Set;

class ScaleOuter {
    constructor(scene) {
        this.scene = scene;
        // Set gameConfig.scale.mode to Phaser.Scale.RESIZE

        this.cameras = new SetStruct();
        this.scrollX = 0;
        this.scrollY = 0;
        this.zoom = 1;

        this._innerViewport = undefined;
        this._outerViewport = undefined;
        this._shrinkOuterViewport = undefined;

        this.boot();
    }

    boot() {
        var scene = this.scene;
        if (CheckScaleMode(scene)) {
            scene.sys.scale.on('resize', this.scale, this);
            scene.sys.game.events.once('prestep',this.start, this);
        }

        scene.sys.events.on('shutdown', function () {
            // cameras of this scene will be destroyed when scene shutdown
            this.cameras.clear();
        }, this);
    }

    destroy() {
        this.stop();

        this.cameras.clear();
        this.cameras = undefined;
        this.scene = undefined;
        this._innerViewport = undefined;
        this._outerViewport = undefined;
        this._shrinkOuterViewport = undefined;
    }

    start() {
        if (this.cameras.size === 0) {
            // Add default camera
            this.add(this.scene.sys.cameras.main);
        }

        this.scale();

        return this;
    }

    stop() {
        var scene = this.scene;
        scene.sys.scale.off('resize', this.scale, this);
        scene.sys.game.events.off('prestep',this.start, this);
        return this;
    }

    add(camera) {
        this.cameras.set(camera)
        this.scale();
        return this;
    }

    get innerViewport() {
        return this._innerViewport;
    }

    get outerViewport() {
        return this._outerViewport;
    }

    getShrinkedOuterViewport(maxRatio, minRatio, out) {
        if (typeof (minRatio) !== 'number') {
            out = minRatio;
            minRatio = undefined;
        }

        if (out === undefined) {
            out = new Rectangle();
        } else if (out === true) {
            if (this._shrinkOuterViewport === undefined) {
                this._shrinkOuterViewport = new Rectangle();
            }
            out = this._shrinkOuterViewport;
        }

        CopyRectangle(this._outerViewport, out);
        ShrinkSizeByRatio(out, maxRatio, minRatio);
        out.centerX = this._outerViewport.centerX;
        out.centerY = this._outerViewport.centerY;

        return out;
    }

    // Internal methods
    onFirstTick() {
        if (this.cameras.size === 0) {
            // Add default camera
            this.add(this.scene.sys.cameras.main);
        }
        this.scale();
    }

    scale() {
        GetScaleOutCameraParameters(this.scene, this);
        this.cameras.iterate(function (camera, index) {
            camera.zoomX = this.zoom;
            camera.zoomY = this.zoom;
            camera.scrollX = this.scrollX;
            camera.scrollY = this.scrollY;
        }, this);

        this._innerViewport = GetInnerViewport(this, this._innerViewport);
        this._outerViewport = GetOuterViewport(this, this._outerViewport);

        return this;
    }
}

export default ScaleOuter;