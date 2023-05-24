var FullFill = function (textObject, width, height) {
    textObject.setFixedSize(width, height);
    // Remove padding
    var padding = textObject.padding;
    width -= (padding.left + padding.right);
    height -= (padding.top + padding.bottom);

    var style = textObject.style;
    // Set wrap width
    style.wrapWidth = Math.max(width, 0);

    // Set max lines
    // height = (maxLines * (lineHeight + lineSpacing)) - lineSpacing
    var lineHeight = style.metrics.fontSize + style.strokeThickness;
    var lineSpacing = style.lineSpacing;
    var maxLines = Math.floor((height - lineSpacing) / (lineHeight + lineSpacing));
    style.maxLines = Math.max(maxLines, 0);

    // Redraw text
    textObject.updateText();
}
export default FullFill;