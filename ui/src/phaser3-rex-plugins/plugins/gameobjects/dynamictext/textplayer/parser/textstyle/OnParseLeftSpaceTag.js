var OnParseLeftSpaceTag = function (textPlayer, parser, config) {
    var tagName = 'left';
    var defaultLeftSpace;
    parser
        .on('start', function () {
            defaultLeftSpace = textPlayer.textStyle.leftSpace;
            textPlayer.textStyle.setLeftSpace(0);
        })
        .on(`+${tagName}`, function (space) {
            if (space === undefined) {
                space = defaultLeftSpace;
            }
            textPlayer.textStyle.setLeftSpace(space);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            textPlayer.textStyle.setLeftSpace(0);
            parser.skipEvent();
        })
        .on('complete', function () {
            textPlayer.textStyle.setLeftSpace(0);
        })
}

export default OnParseLeftSpaceTag;