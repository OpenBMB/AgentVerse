import { ImageTypeName } from '../../blitterbase/bob/Types.js';
import ImageData from '../../blitterbase/bob/image/ImageData.js';

var AddImage = function (blitter, config) {
    if (typeof (config) === 'string') {
        config = {
            frame: config
        }
    }

    var bob = (blitter.poolManager) ? blitter.poolManager.allocate(ImageTypeName) : null;
    if (bob === null) {
        bob = new ImageData(blitter);
    } else {
        bob.setParent(blitter).setActive();
    }
    bob.modifyPorperties(config);

    blitter.addChild(bob);

    return bob;
}

export default AddImage;