import EventEmitterMethods from '../eventemitter/EventEmitterMethods.js';
import GetSceneObject from '../system/GetSceneObject.js';
import GetGame from '../system/GetGame.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ComponentBase {
    constructor(parent, config) {
        this.setParent(parent);  // gameObject, scene, or game

        this.isShutdown = false;

        // Event emitter, default is private event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', true));

        // Register callback of parent destroy event, also see `shutdown` method
        if (this.parent) {
            if (this.parent === this.scene) { // parent is a scene
                this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);

            } else if (this.parent === this.game) { // parent is game
                this.game.events.once('shutdown', this.onEnvDestroy, this);

            } else if (this.parent.once) { // parent is game object or something else
                this.parent.once('destroy', this.onParentDestroy, this);
            }

            // bob object does not have event emitter
        }

    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        // parent might not be shutdown yet
        if (this.parent) {
            if (this.parent === this.scene) { // parent is a scene
                this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);

            } else if (this.parent === this.game) { // parent is game
                this.game.events.off('shutdown', this.onEnvDestroy, this);

            } else if (this.parent.once) { // parent is game object or something else
                this.parent.off('destroy', this.onParentDestroy, this);
            }

            // bob object does not have event emitter
        }


        this.destroyEventEmitter();

        this.parent = undefined;
        this.scene = undefined;
        this.game = undefined;

        this.isShutdown = true;
    }

    destroy(fromScene) {
        this.shutdown(fromScene);
    }

    onEnvDestroy() {
        this.destroy(true);
    }

    onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
    }

    setParent(parent) {
        this.parent = parent;  // gameObject, scene, or game

        this.scene = GetSceneObject(parent);
        this.game = GetGame(parent);

        return this;
    }

};

Object.assign(
    ComponentBase.prototype,
    EventEmitterMethods
);

export default ComponentBase;