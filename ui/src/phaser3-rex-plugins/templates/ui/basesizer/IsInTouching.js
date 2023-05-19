import IsPointerInBounds from '../../../plugins/utils/input/IsPointerInBounds.js';
import IsGameObject from '../../../plugins/utils/system/IsGameObject.js';

var IsInTouching = function (pointer, gameObject) {
    if (IsGameObject(pointer) || (typeof (pointer) === 'string')) {
        gameObject = pointer;
        pointer = undefined;
    }

    if (gameObject === undefined) {
        gameObject = this;
    } else if (typeof (gameObject) === 'string') {
        gameObject = this.getElement(gameObject);
    }

    return IsPointerInBounds(gameObject, pointer);
}

export default IsInTouching;