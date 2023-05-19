var OnParseItalicTag = function (textPlayer, parser, config) {
    var tagName = 'i';
    parser
        .on('start', function () {
            textPlayer.textStyle.setItalic(false);
        })
        .on(`+${tagName}`, function () {
            textPlayer.textStyle.setItalic(true);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            textPlayer.textStyle.setItalic(false);
            parser.skipEvent();
        })
}

export default OnParseItalicTag;