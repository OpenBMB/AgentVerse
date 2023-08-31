import VectorToCursorKeys from '../../utils/input/VectorToCursorKeys.js';
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import ScreenXYToWorldXY from '../../utils/position/ScreenXYToWorldXY.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const CircleClass = Phaser.Geom.Circle;
const CircleContains = Phaser.Geom.Circle.Contains;

class TouchCursor extends VectorToCursorKeys {
    constructor(gameObject, config) {
        var scene = gameObject.scene;
        super(scene, config);
        //this.resetFromJSON(config); // this function had been called in super(config)

        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.scene = scene;
        this.mainCamera = scene.sys.cameras.main;
        this.pointer = undefined;
        this.gameObject = gameObject;
        this.radius = GetValue(config, 'radius', 100);

        gameObject.setInteractive(new CircleClass(gameObject.displayOriginX, gameObject.displayOriginY, this.radius), CircleContains);

        this.boot();
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.pointer = undefined;

        return this;
    }

    toJSON() {
        var o = super.toJSON();
        o.radius = this.radius;

        return o;
    }

    boot() {
        this.gameObject.on('pointerdown', this.onKeyDownStart, this);
        this.gameObject.on('pointerover', this.onKeyDownStart, this);

        this.scene.input.on('pointermove', this.onKeyDown, this);
        this.scene.input.on('pointerup', this.onKeyUp, this);

        this.gameObject.once('destroy', this.onParentDestroy, this);
    }

    shutdown(fromScene) {
        if (!this.scene) {
            return;
        }

        // gameObject events will be removed when this gameObject destroyed 
        // this.gameObject.off('pointerdown', this.onKeyDownStart, this);
        // this.gameObject.off('pointerover', this.onKeyDownStart, this);

        this.scene.input.off('pointermove', this.onKeyDown, this);
        this.scene.input.off('pointerup', this.onKeyUp, this);

        this.destroyEventEmitter();

        this.scene = undefined;
        this.mainCamera = undefined;
        this.pointer = undefined;
        this.gameObject = undefined;

        super.shutdown();
    }

    destroy(fromScene) {
        this.shutdown(fromScene);
    }

    onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
    }

    onKeyDownStart(pointer) {
        if ((!pointer.isDown) ||
            (this.pointer !== undefined)) {
            return;
        }
        this.pointer = pointer;
        this.onKeyDown(pointer);
        this.emit('pointerdown', pointer);
    }

    onKeyDown(pointer) {
        if (this.pointer !== pointer) {
            return;
        }

        var camera = pointer.camera;
        if (!camera) {
            // Pointer is outside of any camera, no worldX/worldY available
            return;
        }

        // Vector of world position
        var gameObject = this.gameObject;
        var worldXY = this.end;

        // Note: pointer.worldX, pointer.worldY might not be the world position of this camera,
        // if this camera is not main-camera
        if (camera !== this.mainCamera) {
            worldXY = ScreenXYToWorldXY(pointer.x, pointer.y, camera, worldXY);
        } else {
            worldXY.x = pointer.worldX;
            worldXY.y = pointer.worldY;
        }

        var startX = gameObject.x;
        var startY = gameObject.y;
        if (gameObject.scrollFactorX === 0) {
            startX += camera.scrollX;
        }
        if (gameObject.scrollFactorY === 0) {
            startY += camera.scrollY;
        }

        this.setVector(startX, startY, worldXY.x, worldXY.y);

        this.emit('update');
    }

    onKeyUp(pointer) {
        if (this.pointer !== pointer) {
            return;
        }
        this.pointer = undefined;
        this.clearVector();
        this.emit('update');
        this.emit('pointerup', pointer);
    }

    forceUpdate() {
        var pointer = this.pointer;
        if (!pointer || !pointer.isDown) {
            return this;
        }

        this.onKeyDown(pointer);
        return this;
    }

}

Object.assign(
    TouchCursor.prototype,
    EventEmitterMethods
);

export default TouchCursor;