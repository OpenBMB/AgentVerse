import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import IsPointerInHitArea from '../../utils/input/IsPointerInHitArea.js';
import IsPointerInBounds from '../../utils/input/IsPointerInBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ClickOutside extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this._enable = undefined;

        var inputConfig = GetValue(config, "inputConfig", undefined);
        if (inputConfig) {
            gameObject.setInteractive(inputConfig);
        }

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, "enable", true));
        this.setMode(GetValue(o, "mode", 1));
        this.setClickInterval(GetValue(o, "clickInterval", 100));
        return this;
    }

    boot() {
        var scene = this.parent.scene;
        scene.input.on('pointerdown', this.onPress, this);
        scene.input.on('pointerup', this.onRelease, this);
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        var scene = this.parent.scene;
        scene.input.off('pointerdown', this.onPress, this);
        scene.input.off('pointerup', this.onRelease, this);

        super.shutdown(fromScene);
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }

        this._enable = e;
        var eventName = (e) ? 'enable' : 'disable';
        this.emit(eventName, this, this.parent);
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = CLICKMODE[m];
        }
        this.mode = m;
        return this;
    }

    setClickInterval(interval) {
        this.clickInterval = interval; // ms
        return this;
    }

    isPointerInside(pointer) {
        var gameObject = this.parent;
        var isInsideCallback = (gameObject.input) ? IsPointerInHitArea : IsPointerInBounds;
        return isInsideCallback(gameObject, pointer);
    }

    // internal
    onPress(pointer) {
        if (this.mode === 0) {
            // Do nothing if game object is not visible
            if (!this.parent.willRender(pointer.camera)) {
                return;
            }

            if (!this.isPointerInside(pointer)) {
                this.click(pointer.downTime, pointer);
            }
        }
    }

    onRelease(pointer) {
        if (this.mode === 1) {
            // Do nothing if game object is not visible
            if (!this.parent.willRender(pointer.camera)) {
                return;
            }

            if (!this.isPointerInside(pointer)) {
                this.click(pointer.upTime, pointer);
            }
        }
    }

    click(nowTime, pointer) {
        if (!this.enable) {
            return this;
        }

        if (nowTime === undefined) {
            // fires 'clickoutside' event manually
            this.emit('clickoutside', this, this.parent, pointer);
            return this;
        }

        var lastClickTime = this.lastClickTime;
        if ((lastClickTime !== undefined) &&
            ((nowTime - lastClickTime) <= this.clickInterval)) {
            return this;
        }
        this.lastClickTime = nowTime;
        this.emit('clickoutside', this, this.parent, pointer);

        return this;
    }
}

const CLICKMODE = {
    press: 0,
    pointerdown: 0,
    release: 1,
    pointerup: 1,
};

export default ClickOutside;