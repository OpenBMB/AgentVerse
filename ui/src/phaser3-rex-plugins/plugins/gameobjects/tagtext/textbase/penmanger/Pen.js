import CONST from '../../../textbase/const.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const NO_NEWLINE = CONST.NO_NEWLINE;
const RAW_NEWLINE = CONST.RAW_NEWLINE;

class Pen {
    constructor(config) {
        this.prop = {};
        this.resetFromJSON(config);
    }

    resetFromJSON(o) { // (txt, x, y, width, prop, newLineMode, startIndex)
        this.text = GetValue(o, 'text', '');
        this.x = GetValue(o, 'x', 0);
        this.y = GetValue(o, 'y', 0);
        this.width = GetValue(o, 'width', 0);

        var prop = GetValue(o, 'prop', null);
        if (prop === null) {
            prop = {};
        }
        this.prop = prop;
        this.newLineMode = GetValue(o, 'newLineMode', 0);
        this.startIndex = GetValue(o, 'startIndex', 0);
    }

    get plainText() {
        var txt = this.text
        if (this.newLineMode === RAW_NEWLINE) {
            txt += "\n";
        }

        return txt;
    }

    get wrapText() {
        var txt = this.text;
        if (this.newLineMode !== NO_NEWLINE) {
            txt += "\n";
        }

        return txt;
    }

    get rawTextLength() {
        var len = this.text.length;
        if (this.newLineMode === RAW_NEWLINE) {
            len += 1;
        }
        return len;
    }

    get endIndex() {
        return this.startIndex + this.rawTextLength;
    }

    get lastX() {
        return this.x + this.width;
    }

    get isTextPen() {
        return (this.text !== '');
    }

    get isImagePen() {
        return !!this.prop.img;
    }

    get hasAreaMarker() {
        return !!this.prop.area || !!this.prop.url;
    }
};

export default Pen;