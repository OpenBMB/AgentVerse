var OnParseContentOn = function (textPlayer, parser, config) {
    var tagName = 'content.on';
    parser
        .on(`+${tagName}`, function () {
            parser.setContentOutputEnable();
            parser.skipEvent();
        })
}

export default OnParseContentOn;