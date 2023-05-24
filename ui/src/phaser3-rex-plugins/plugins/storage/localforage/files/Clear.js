import ClearObj from '../../../utils/object/Clear.js';

var Clear = function () {
    ClearObj(this.cacheHeaders);
    return this.store.clear();
}

export default Clear;