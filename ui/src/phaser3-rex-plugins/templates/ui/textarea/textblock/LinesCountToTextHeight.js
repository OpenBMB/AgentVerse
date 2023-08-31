var LinesCountToTextHeight = function (linesCount) {
    // height = (linesCount * (lineHeight + lineSpacing)) - lineSpacing
    return (linesCount * (this.textLineHeight + this.textLineSpacing)) - this.textLineSpacing;
}
export default LinesCountToTextHeight;