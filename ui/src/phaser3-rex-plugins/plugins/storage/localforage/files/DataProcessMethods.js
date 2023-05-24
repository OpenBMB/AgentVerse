import LZString from '../../../utils/lzstring/lz-string.min.js';

export default {
    toSaveData(data) {
        if (this.zipMode) {
            data = LZString.compress(JSON.stringify(data));
        }
        return data;
    },

    toLoadData(data) {
        if (this.zipMode) {
            data = JSON.parse(LZString.decompress(data))
        }
        return data;
    }
}