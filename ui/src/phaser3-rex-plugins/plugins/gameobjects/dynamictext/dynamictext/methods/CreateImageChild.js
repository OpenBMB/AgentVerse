import ImageData from '../bob/image/ImageData.js';
import { ImageTypeName } from '../bob/Types.js';

var CreateImageChild = function(key, frame, properties) {
    var child = this.poolManager.allocate(ImageTypeName);

    if (child === null) {
        child = new ImageData(
            this,               // parent
            key,
            frame
        );
    } else {
        child
            .setParent(this)
            .setActive()
            .setTexture(key, frame)
    }
    child.modifyPorperties(properties);

    return child;
}

export default CreateImageChild;