var OnParseAlignTag = function (textPlayer, parser, config) {
    var tagName = 'align';
    parser
        .on(`+${tagName}`, function (align) {
            textPlayer.textStyle.setAlign(align);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            textPlayer.textStyle.setAlign();
            parser.skipEvent();
        })
        .on('complete', function () {
            textPlayer.textStyle.setAlign();
        })
}

export default OnParseAlignTag;