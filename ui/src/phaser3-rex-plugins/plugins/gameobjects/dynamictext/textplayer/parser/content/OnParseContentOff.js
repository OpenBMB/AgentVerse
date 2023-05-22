var OnParseContentOff = function (textPlayer, parser, config) {
    var tagName = 'content.off';
    parser
        .on(`+${tagName}`, function () {
            parser.setContentOutputEnable(false);
            parser.skipEvent();
        })
}

export default OnParseContentOff;