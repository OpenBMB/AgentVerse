import GetValue from '../../../utils/object/GetValue.js';
import TouchZone from './TouchZone.js';

import OnPointerDown from './OnPointerDown.js';
import OnPointerUp from './OnPointerUp.js';
import OnPointerMove from './OnPointerMove.js';

import InstallTap from './InstallTap.js';
import InstallPress from './InstallPress.js';
import InstallSwipe from './InstallSwipe.js';

class Input {
    constructor(board, config) {
        var enable = GetValue(config, 'enable', true);
        var useTouchZone = GetValue(config, 'useTouchZone', true);

        var scene = board.scene;

        this.board = board;
        this.touchZone = undefined;
        this._enable = true;
        this.pointer = null;
        this.tilePosition = { x: undefined, y: undefined };
        this.prevTilePosition = { x: undefined, y: undefined };

        if (useTouchZone) {
            var touchZone = new TouchZone(scene);
            touchZone.on('pointerdown', OnPointerDown, this);
            touchZone.on('pointerup', OnPointerUp, this);
            touchZone.on('pointermove', OnPointerMove, this);
            this.touchZone = touchZone;

        } else {
            scene.input.on('pointerdown', OnPointerDown, this);
            scene.input.on('pointerup', OnPointerUp, this);
            scene.input.on('pointermove', OnPointerMove, this);

        }

        this.tap = InstallTap.call(this);
        this.press = InstallPress.call(this);
        this.swipe = InstallSwipe.call(this);

        board.once('destroy', this.onBoardDestroy, this);

        this.setEnable(enable);
    }

    destroy(fromScene) {
        this.tap.destroy(fromScene);
        this.press.destroy(fromScene);
        this.swipe.destroy(fromScene);

        if (this.touchZone) {
            this.touchZone.destroy(fromScene);
            this.touchZone = undefined;

        } else {
            var scene = this.board.scene;
            if (scene) {
                scene.input.off('pointerdown', OnPointerDown, this);
                scene.input.off('pointerup', OnPointerUp, this);
                scene.input.off('pointermove', OnPointerMove, this);
            }

        }

        this.board = undefined;

        // board.off('destroy', this.onBoardDestroy, this);
    }

    onBoardDestroy(parent, fromScene) {
        this.destroy(fromScene);
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }

        if (!e) {
            this.pointer = null;
        }
        this._enable = e;

        if (this.touchZone) {
            if (e) {
                this.touchZone.setInteractive();
            } else {
                this.touchZone.disableInteractive();
            }
        }
        this.tap.setEnable(e);
        this.press.setEnable(e);
        this.swipe.setEnable(e);
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }
}
export default Input;