import PreLayoutBase from '../../basesizer/PreLayout.js';

var PreLayout = function () {
    // Style of text
    this._textLineHeight = undefined;
    this._textLineSpacing = undefined;
    // Style of text, width of text
    this._visibleLinesCount = undefined;
    // Style of text, total lines of content
    this._textHeight = undefined;
    this._textVisibleHeight = undefined;

    PreLayoutBase.call(this);
    return this;
}
export default PreLayout;