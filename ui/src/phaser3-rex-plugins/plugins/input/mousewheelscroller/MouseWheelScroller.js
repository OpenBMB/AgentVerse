import ComponentBase from '../../utils/componentbase/ComponentBase.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class MouseWheelScroller extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        if (this.parent !== this.scene) {
            this.focusMode = GetValue(config, 'focus', false);
        } else {
            this.focusMode = false;
        }

        this.setSpeed(GetValue(config, 'speed', 0.1));
        this.setEnable(GetValue(config, 'enable', true));

        if (!this.focusMode) { // Register on scene
            this.scene.input.on('wheel', this.onSceneScroll, this);
        } else {
            var gameObject = this.parent;
            gameObject
                .setInteractive(GetValue(config, "inputConfig", undefined))
                .on('wheel', function (pointer, dx, dy, dz, event) {
                    if (!this.enable) {
                        return;
                    }
                    this.scroll(dy);
                }, this);

        }
    }

    destroy() {
        if (!this.focusMode) {
            this.scene.input.off('wheel', this.onSceneScroll, this);
        } else {
            // GameObject events will be removed when this gameObject destroyed 
        }
    }

    onSceneScroll(pointer, currentlyOver, dx, dy, dz, event) {
        if (!this.enable) {
            return;
        }
        this.scroll(dy);
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    scroll(dy) {
        dy *= this.speed;
        this.emit('scroll', dy, this.parent, this);
    }
}

export default MouseWheelScroller;