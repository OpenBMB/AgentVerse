import TextToLines from "../../../../plugins/utils/text/TextToLines.js";

var SetText = function (text) {
    if (text !== undefined) {
        this.text = text;
    }

    // Wrap content in lines
    this.lines = TextToLines(this.textObject, this.text, this.lines);

    // Get lines count
    this.linesCount = this.lines.length;

    // Re-calculate these values later
    this._textHeight = undefined;
    this._textVisibleHeight = undefined;

    this.updateTextObject();
    return this;
}
export default SetText;