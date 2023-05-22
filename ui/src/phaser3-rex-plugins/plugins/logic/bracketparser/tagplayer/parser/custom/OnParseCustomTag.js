var OnParseCustomTag = function (tagPlayer, parser, config) {
    parser
        .on('+', function (tagName, ...params) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            tagPlayer.emit(`+${tagName}`, parser, ...params);
        })
        .on('-', function (tagName) {
            if (parser.skipEventFlag) {
                return;
            }

            tagPlayer.emit(`-${tagName}`, parser);
        })
}

export default OnParseCustomTag;