var OnParseStrokeColorTag = function (textPlayer, parser, config) {
    var tagName = 'stroke';
    var defaultStroke;
    parser
        .on('start', function () {
            defaultStroke = textPlayer.textStyle.stroke;
            textPlayer.textStyle.setStrokeStyle(null);
        })
        .on(`+${tagName}`, function (color) {
            if (color === undefined) {
                color = defaultStroke;
            }
            textPlayer.textStyle.setStrokeStyle(color);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            textPlayer.textStyle.setStrokeStyle(null);
            parser.skipEvent();
        })
        .on('complete', function () {
            textPlayer.textStyle.setStrokeStyle(defaultStroke);
        })
}

export default OnParseStrokeColorTag;