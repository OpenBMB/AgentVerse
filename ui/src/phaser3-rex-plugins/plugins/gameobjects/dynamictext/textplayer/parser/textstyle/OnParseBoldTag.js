var OnParseBoldTag = function (textPlayer, parser, config) {
    var tagName = 'b';
    parser
        .on('start', function () {
            textPlayer.textStyle.setBold(false);
        })
        .on(`+${tagName}`, function () {
            textPlayer.textStyle.setBold(true);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            textPlayer.textStyle.setBold(false);
            parser.skipEvent();
        })
}

export default OnParseBoldTag;