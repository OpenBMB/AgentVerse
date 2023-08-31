import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import Cooldown from '../../utils/time/cooldown/Cooldown.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class InTouching extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this._enable = undefined;
        this.cooldown = new Cooldown();
        this.parent.setInteractive(GetValue(config, 'inputConfig', undefined));
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.pointer = undefined;
        this.prevIsInTouch = false;
        this.isInTouching = false;
        this.setEnable(GetValue(o, 'enable', true));
        this.setCooldown(GetValue(o, 'cooldown', undefined));
        return this;
    }

    boot() {
        var gameObject = this.parent;
        gameObject.on('pointerdown', this.onPointIn, this);
        gameObject.on('pointerover', this.onPointIn, this);
        gameObject.on('pointerup', this.onPointOut, this);
        gameObject.on('pointerout', this.onPointOut, this);
        this.scene.sys.events.on('preupdate', this.preupdate, this);
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        // GameObject events will be removed when this gameObject destroyed 
        // this.parent.off('pointerdown', this.onPointIn, this);
        // this.parent.off('pointerover', this.onPointIn, this);
        // this.parent.off('pointerup', this.onPointOut, this);
        // this.parent.off('pointerout', this.onPointOut, this);
        this.scene.sys.events.off('preupdate', this.preupdate, this);

        this.pointer = undefined;
        super.shutdown(fromScene);
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }

        if (!e) {
            this.prevIsInTouch = false;
            this.isInTouching = false;
            this.pointer = undefined;
        }
        this._enable = e;
        return this;
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    get cooldownTime() {
        return this.cooldown.cooldownTime;
    }

    set cooldownTime(time) {
        this.cooldown.setCooldownTime(time);
    }

    setCooldown(time) {
        this.cooldownTime = time;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    // internal
    onPointIn(pointer, localX, localY) {
        if ((!this.enable) ||
            (!pointer.isDown) ||
            (this.pointer !== undefined)) {
            return;
        }
        this.pointer = pointer;
        this.isInTouching = true;
    }

    onPointOut(pointer) {
        if ((!this.enable) ||
            (this.pointer !== pointer)) {
            return;
        }
        this.pointer = undefined;
        this.isInTouching = false;
    }

    preupdate(time, delta) {
        this.cooldown.update(time, delta);

        if (!this.prevIsInTouch && this.isInTouching) {
            this.emit('touchstart', this, this.parent);
        }

        if (this.isInTouching && this.cooldown.request()) {
            this.emit('intouch', this, this.parent, this.pointer);
        }
        
        if (this.prevIsInTouch && !this.isInTouching) {
            this.emit('touchend', this, this.parent);
        }

        this.prevIsInTouch = this.isInTouching;
    }
}

export default InTouching;