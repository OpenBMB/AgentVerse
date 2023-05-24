import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';
import { GetBounds } from '../../utils/bounds/GetBounds.js';

const Rectangle = Phaser.Geom.Rectangle;
const GetValue = Phaser.Utils.Objects.GetValue;

class Bounds extends TickTask {
    constructor(gameObject, config) {
        if (config === undefined) {
            config = {};
        }
        config.tickEventName = 'postupdate';
        super(gameObject, config);
        // this.parent = gameObject;

        this.bounds = new Rectangle();
        this.boundsTarget = undefined;
        this.boundsEnable = {};
        this.clearHitResult();
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        var target = GetValue(o, 'target');
        if (target) {
            this.setBoundsTarget(target);
        } else {
            this.setBoundsTarget();
            this.setBounds(GetValue(o, 'bounds'));
        }
        this.setEnable(GetValue(o, 'enable', true));
        this.setAlignMode(GetValue(o, 'alignMode', 0));

        return this;
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        super.shutdown(fromScene);
    }

    setBoundsTarget(gameObject) {
        this.boundsTarget = gameObject;
        return this;
    }

    setBounds(boundsConfig) {
        if (!boundsConfig) {
            return this;
        }

        var bounds = this.bounds;

        bounds.setSize(
            GetValue(boundsConfig, 'width', 0),
            GetValue(boundsConfig, 'height', 0)
        )
        if (boundsConfig.hasOwnProperty('centerX')) {
            bounds.centerX = boundsConfig.centerX;
        } else {
            bounds.x = GetValue(boundsConfig, 'x', 0);
        }
        if (boundsConfig.hasOwnProperty('centerY')) {
            bounds.centerY = boundsConfig.centerY;
        } else {
            bounds.y = GetValue(boundsConfig, 'y', 0);
        }

        return this;
    }

    setEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        var boundsEnable = this.boundsEnable;
        if (typeof (enable) === 'boolean') {
            boundsEnable.left = enable;
            boundsEnable.right = enable;
            boundsEnable.top = enable;
            boundsEnable.bottom = enable;
        } else {
            boundsEnable.left = GetValue(enable, 'left', false);
            boundsEnable.right = GetValue(enable, 'right', false);
            boundsEnable.top = GetValue(enable, 'top', false);
            boundsEnable.bottom = GetValue(enable, 'bottom', false);
        }

        this.isRunning = this.enable;

        return this;
    }

    setAlignMode(mode) {
        if (typeof (mode) === 'string') {
            mode = AlignMode[mode];
        }
        this.alignMode = mode;
        return this;
    }

    get enable() {
        var boundsEnable = this.boundsEnable;
        return boundsEnable.left || boundsEnable.right || boundsEnable.top || boundsEnable.bottom;
    }

    set enable(value) {
        this.setEnable(value);
    }

    update(time, delta) {
        var gameObject = this.parent;
        this.clearHitResult();
        if (!this.enable) {
            return this;
        }

        var target = this.boundsTarget;
        if (target) {
            GetBounds(target, this.bounds);
        }

        var bounds = this.bounds;
        var boundsEnable = this.boundsEnable;

        var alignToGOBound = (this.alignMode === 0);
        var gameObjectBounds = (alignToGOBound) ? GetBounds(gameObject, true) : undefined;

        if (boundsEnable.left) {
            var left = (alignToGOBound) ? gameObjectBounds.left : gameObject.x;
            var dx = bounds.left - left;
            if (dx > 0) {
                gameObject.x += dx;
                this.isHitAny = true;
                this.isHitLeft = true;
                this.emit('hitleft', this.parent, this);
            }
        }
        if (boundsEnable.right) {
            var right = (alignToGOBound) ? gameObjectBounds.right : gameObject.x;
            var dx = bounds.right - right;
            if (dx < 0) {
                gameObject.x += dx;
                this.isHitAny = true;
                this.isHitRight = true;
                this.emit('hitright', this.parent, this);
            }
        }
        if (boundsEnable.top) {
            var top = (alignToGOBound) ? gameObjectBounds.top : gameObject.y;
            var dy = bounds.top - top;
            if (dy > 0) {
                gameObject.y += dy;
                this.isHitAny = true;
                this.isHitTop = true;
                this.emit('hittop', this.parent, this);
            }
        }
        if (boundsEnable.bottom) {
            var bottom = (alignToGOBound) ? gameObjectBounds.bottom : gameObject.y;
            var dy = bounds.bottom - bottom;
            if (dy < 0) {
                gameObject.y += dy;
                this.isHitAny = true;
                this.isHitBottom = true;
                this.emit('hitbottom', this.parent, this);
            }
        }

        if (this.isHitAny) {
            this.emit('hitany', this.parent, this);
        }
    }

    clearHitResult() {
        this.isHitAny = false;
        this.isHitLeft = false;
        this.isHitRight = false;
        this.isHitTop = false;
        this.isHitBottom = false;
        return this;
    }
}

const AlignMode = {
    bounds: 0,
    origin: 1
}

export default Bounds;