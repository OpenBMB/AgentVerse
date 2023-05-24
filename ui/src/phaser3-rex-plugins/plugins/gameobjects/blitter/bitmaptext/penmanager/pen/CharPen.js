import ImagePen from './ImagePen.js';

class CharPen extends ImagePen {
    onFree() {
        this.char = undefined;
        super.onFree();
    }

    setChar(char) {
        this.char = char;
        var fontData = this.bitmapText.fontData;
        if (!fontData) {
            return this;
        }

        var frame = fontData.chars[char.charCodeAt(0)];
        this.setFrame(frame);

        return this;
    }

}

export default CharPen;