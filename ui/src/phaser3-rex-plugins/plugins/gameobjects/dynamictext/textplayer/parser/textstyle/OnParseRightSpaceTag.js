var OnParseRightSpaceTag = function (textPlayer, parser, config) {
    var tagName = 'right';
    var defaultRightSpace;
    parser
        .on('start', function () {
            defaultRightSpace = textPlayer.textStyle.rightSpace;
            textPlayer.textStyle.setRightSpace(0);
        })
        .on(`+${tagName}`, function (space) {
            if (space === undefined) {
                space = defaultRightSpace;
            }
            textPlayer.textStyle.setRightSpace(space);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            textPlayer.textStyle.setRightSpace(0);
            parser.skipEvent();
        })
        .on('complete', function () {
            textPlayer.textStyle.setRightSpace(0);
        })
}

export default OnParseRightSpaceTag;