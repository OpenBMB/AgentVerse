import BlitterBase from '../blitterbase/BlitterBase.js';
import AddImage from '../blitterbase/utils/AddImage.js';

class Blitter extends BlitterBase {
    addImage(config) {
        AddImage(this, config);
        return this;
    }
}

export default Blitter;