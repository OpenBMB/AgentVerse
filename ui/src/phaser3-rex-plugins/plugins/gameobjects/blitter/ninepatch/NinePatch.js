import Blitter from '../blitterbase/BlitterBase.js'
import NinePatchBase from '../../../utils/ninepatch/NinePatch.js';
import Methods from './Methods.js';

class NinePatch extends NinePatchBase(Blitter, 'rexNinePatch2') {
    setBaseTexture(key, baseFrameName, columns, rows) {
        this.setTexture(key, baseFrameName);
        super.setBaseTexture(key, baseFrameName, columns, rows);
        return this;
    }
}

Object.assign(
    NinePatch.prototype,
    Methods
);

export default NinePatch;