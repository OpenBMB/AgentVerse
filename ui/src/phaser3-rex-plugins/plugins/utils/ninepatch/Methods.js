import SetGetFrameNameCallback from './texture/SetGetFrameNameCallback.js';
import SetBaseTexture from './texture/SetBaseTexture.js';
import UpdateTexture from './texture/UpdateTexture.js';
import SetStretchMode from './texture/SetStretchMode.js';
import GetStretchMode from './texture/GetStretchMode.js';
import SetPreserveRatio from './texture/SetPreserveRatio.js';
import SetMaxFixedPartScale from './texture/SetMaxFixedPartScale.js';
import NOOP from '../object/NOOP';

export default {
    _beginDraw: NOOP,
    _drawImage: NOOP,
    _drawTileSprite: NOOP,
    _endDraw: NOOP,

    setGetFrameNameCallback: SetGetFrameNameCallback,
    setBaseTexture: SetBaseTexture,
    updateTexture: UpdateTexture,
    setStretchMode: SetStretchMode,
    getStretchMode: GetStretchMode,
    setPreserveRatio: SetPreserveRatio,
    setMaxFixedPartScale: SetMaxFixedPartScale,
};
