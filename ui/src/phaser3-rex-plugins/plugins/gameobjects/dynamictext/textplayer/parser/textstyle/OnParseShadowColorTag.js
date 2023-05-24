var OnParseShadowColorTag = function (textPlayer, parser, config) {
    var tagName = 'shadow';
    var defaultShadowColor;
    parser
        .on('start', function () {
            defaultShadowColor = textPlayer.textStyle.shadowColor;
            textPlayer.textStyle.setShadowColor(null);
        })
        .on(`+${tagName}`, function (color) {
            if (color === undefined) {
                color = defaultShadowColor;
            }
            textPlayer.textStyle.setShadowColor(color);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            textPlayer.textStyle.setShadowColor(null);
            parser.skipEvent();
        })
        .on('complete', function () {
            textPlayer.textStyle.setShadowColor(defaultShadowColor);
        })
}

export default OnParseShadowColorTag;