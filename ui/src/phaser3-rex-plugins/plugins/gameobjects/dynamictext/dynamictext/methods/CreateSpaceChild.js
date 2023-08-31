import Space from '../bob/space/Space.js';
import { SpaceTypeName } from '../bob/Types.js';

var CreateSpaceChild = function (width) {
    var child = this.poolManager.allocate(SpaceTypeName);

    if (child === null) {
        child = new Space(
            this,               // parent
            width
        );
    } else {
        child
            .setParent(this)
            .setActive()
            .setSpaceWidth(width)
    }
    return child;
}

export default CreateSpaceChild;