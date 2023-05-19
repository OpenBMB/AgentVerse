var OnParseFontSizeTag = function (textPlayer, parser, config) {
    var tagName = 'size';
    var defaultFontSize;
    parser
        .on('start', function () {
            defaultFontSize = textPlayer.textStyle.fontSize;
        })
        .on(`+${tagName}`, function (fontSize) {
            textPlayer.textStyle.setFontSize(fontSize);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            textPlayer.textStyle.setFontSize(defaultFontSize);
            parser.skipEvent();
        })
        .on('complete', function () {
            textPlayer.textStyle.setFontSize(defaultFontSize);
        })
}

export default OnParseFontSizeTag;