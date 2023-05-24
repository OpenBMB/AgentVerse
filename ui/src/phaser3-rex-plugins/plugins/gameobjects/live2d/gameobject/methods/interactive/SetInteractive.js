import HitAreaCallback from './HitAreaCallback.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GameObject = Phaser.GameObjects.GameObject;

var SetInteractive = function (hitArea, hitAreaCallback, dropZone) {
    var isInit = !this.input;

    if (IsPlainObject(hitArea)) {
        hitArea.hitArea = HitAreaCallback;
        hitArea.hitAreaCallback = HitAreaCallback;
    } else {
        hitArea = HitAreaCallback;
        hitAreaCallback = HitAreaCallback;
    }

    GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);

    if (isInit) {
        this
            .on('pointerdown', function (pointer, localX, localY, event) {
                FireEvent(this, 'pointerdown', pointer, localX, localY, event);
            })
            .on('pointerup', function (pointer, localX, localY, event) {
                FireEvent(this, 'pointerup', pointer, localX, localY, event);
            })
            .on('pointermove', function (pointer, localX, localY, event) {
                FireEvent(this, 'pointermove', pointer, localX, localY, event);
            })
    }

    return this;
}

var FireEvent = function (gameObject, eventPrefix, pointer, localX, localY, event) {
    var hitTestResult = gameObject.hitTestResult;
    for (var name in hitTestResult) {
        if (hitTestResult[name]) {
            gameObject.emit(`${eventPrefix}-${name}`, pointer, localX, localY, event);
        }
    }
}

export default SetInteractive;