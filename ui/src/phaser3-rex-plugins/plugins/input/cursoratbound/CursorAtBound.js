import CursorKeys from '../../utils/input/CursorKeys.js'
import GetViewport from '../../utils/system/GetViewport.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CursorAtBound extends CursorKeys {
    constructor(scene, config) {
        super(scene);

        this.scene = scene;
        this.sensitiveDistance = GetValue(config, 'sensitiveDistance', 20);

        var bounds = GetValue(config, 'bounds', undefined);
        if (bounds === undefined) {
            bounds = GetViewport(scene);
        }
        this.bounds = bounds;

        this.boot();
    }

    boot() {
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.sys.events.once('shutdown', this.destroy, this);
    }

    shutdown() {
        if (!this.scene) {
            return;
        }

        this.scene.input.off('pointermove', this.onPointerMove, this);
        this.scene.sys.events.off('shutdown', this.destroy, this);
        this.scene = undefined;

        super.shutdown();
    }

    destroy() {
        this.shutdown();
    }

    onPointerMove(pointer) {
        var cursorX = pointer.x,
            cursorY = pointer.y;
        var left = this.bounds.left,
            right = this.bounds.right,
            top = this.bounds.top,
            bottom = this.bounds.bottom,
            sensitiveDistance = this.sensitiveDistance;
        var atLeftBound = (cursorX >= left) && (cursorX <= (left + sensitiveDistance)),
            atRightBound = (cursorX <= right) && (cursorX >= (right - sensitiveDistance)),
            atTopBound = (cursorY >= top) && (cursorY <= (top + sensitiveDistance)),
            atBottomBound = (cursorY <= bottom) && (cursorY >= (bottom - sensitiveDistance))

        this.clearAllKeysState();
        this.setKeyState('left', atLeftBound);
        this.setKeyState('right', atRightBound);
        this.setKeyState('up', atTopBound);
        this.setKeyState('down', atBottomBound);
    }

    get up() {
        return this.upKeyDown;
    }

    get down() {
        return this.downKeyDown;
    }

    get left() {
        return this.leftKeyDown;
    }

    get right() {
        return this.rightKeyDown;
    }

    get noKey() {
        return this.noKeyDown;
    }
}

export default CursorAtBound;