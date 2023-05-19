export default {
    overrideBitmapText(bitmapText) {
        var self = this;
        var setTextSave = bitmapText.setText;
        bitmapText.setText = function (text, lock) {
            self.load(text, lock);
            setTextSave.call(bitmapText, text);
            return bitmapText;
        }
        return bitmapText;
    }
}