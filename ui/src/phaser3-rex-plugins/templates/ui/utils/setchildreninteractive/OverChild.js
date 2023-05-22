import PointToChild from './PointToChild.js';
import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OverChild = function (config) {
    var overConfig = GetValue(config, 'over', undefined);
    if (overConfig === false) {
        return;
    } else if (overConfig === true) {
        overConfig = undefined;
    }

    this
        .on('pointermove', OnMove, this)
        .on('pointerover', OnMove, this)
        .on('pointerout', OnOut, this)  // pointer-up is included too
}

var OnMove = function (pointer, localX, localY, event) {
    var childrenInteractive = this._childrenInteractive;
    var child = PointToChild(childrenInteractive.targetSizers, pointer.worldX, pointer.worldY);
    var preChild = childrenInteractive.lastOverChild;
    if (child && preChild &&
        (child === preChild)) {
        return;
    }

    childrenInteractive.lastOverChild = child;
    EmitChildEvent(
        childrenInteractive.eventEmitter,
        `${childrenInteractive.eventNamePrefix}out`,
        childrenInteractive.targetSizers,
        preChild, undefined,
        pointer, event
    );
    EmitChildEvent(
        childrenInteractive.eventEmitter,
        `${childrenInteractive.eventNamePrefix}over`,
        childrenInteractive.targetSizers,
        child, undefined,
        pointer, event
    );
}

var OnOut = function (pointer, event) {
    var childrenInteractive = this._childrenInteractive;
    var child = childrenInteractive.lastOverChild;
    childrenInteractive.lastOverChild = null;
    EmitChildEvent(
        childrenInteractive.eventEmitter,
        `${childrenInteractive.eventNamePrefix}out`,
        childrenInteractive.targetSizers,
        child, undefined,
        pointer, event
    );
}

export default OverChild;