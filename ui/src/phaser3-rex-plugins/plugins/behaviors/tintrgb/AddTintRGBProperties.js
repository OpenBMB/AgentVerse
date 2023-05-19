import { GetR, GetG, GetB } from '../../utils/color/GetRGB.js';
import { SetR, SetG, SetB, SetRGB } from '../../utils/color/SetColor.js';

var AddTintRGBProperties = function (gameObject, tintRGB) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('tintR')) {
        return gameObject;
    }

    if (tintRGB === undefined) {
        tintRGB = 0xffffff;
    }

    var tintR = GetR(tintRGB);
    var tintG = GetG(tintRGB);
    var tintB = GetB(tintRGB);

    // Override tint property
    Object.defineProperty(gameObject, 'tint', {
        get: function () {
            return tintRGB;
        },
        set: function (value) {
            value = Math.floor(value) & 0xffffff;
            if (gameObject.setTint) {
                gameObject.setTint(value);
            }
            if (tintRGB !== value) {
                tintRGB = value;
                tintR = GetR(tintRGB);
                tintG = GetG(tintRGB);
                tintB = GetB(tintRGB);
                // gameObject.emit('_tintchange', value, tintR, tintG, tintB);
            }
        }
    });

    Object.defineProperty(gameObject, 'tintR', {
        get: function () {
            return tintR;
        },
        set: function (value) {
            value = Math.floor(value) & 0xff;
            if (tintR !== value) {
                tintR = value;
                gameObject.tint = SetR(tintRGB, value);
            }
        },
    })
    Object.defineProperty(gameObject, 'tintG', {
        get: function () {
            return tintG;
        },
        set: function (value) {
            value = Math.floor(value) & 0xff;
            if (tintG !== value) {
                tintG = value;
                gameObject.tint = SetG(tintRGB, value);
            }
        },
    })
    Object.defineProperty(gameObject, 'tintB', {
        get: function () {
            return tintB;
        },
        set: function (value) {
            value = Math.floor(value) & 0xff;
            if (tintB !== value) {
                tintB = value;
                gameObject.tint = SetB(tintRGB, value);
            }
        },
    })
    Object.defineProperty(gameObject, 'tintGray', {
        get: function () {
            return Math.floor((tintR + tintG + tintB) / 3);
        },
        set: function (value) {
            value = Math.floor(value) & 0xff;
            if ((tintR !== value) || (tintG !== value) || (tintB !== value)) {
                tintR = value;
                tintG = value;
                tintB = value;
                gameObject.tint = SetRGB(tintRGB, value, value, value);
            }
        },
    })

    gameObject.tint = tintRGB;

    return gameObject;
}

export default AddTintRGBProperties;