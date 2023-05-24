var OnParseOffsetXTag = function (textPlayer, parser, config) {
    var tagName = 'x';
    var defaultOffsetX;
    parser
        .on('start', function () {
            defaultOffsetX = textPlayer.textStyle.offsetY;
            textPlayer.textStyle.setOffsetX(0);
        })
        .on(`+${tagName}`, function (y) {
            if (y === undefined) {
                y = defaultOffsetX;
            }
            textPlayer.textStyle.setOffsetX(y);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            textPlayer.textStyle.setOffsetX(0);
            parser.skipEvent();
        })
        .on('complete', function () {
            textPlayer.textStyle.setOffsetX(0);
        })
}

export default OnParseOffsetXTag;