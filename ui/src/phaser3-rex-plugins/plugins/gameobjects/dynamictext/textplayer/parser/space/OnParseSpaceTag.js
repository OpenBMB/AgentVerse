import AppendSpaceBase from '../../../dynamictext/methods/AppendSpace.js';

var OnParseImageTag = function (textPlayer, parser, config) {
    var tagName = 'space';
    parser
        .on(`+${tagName}`, function (width) {
            AppendSpaceBase.call(textPlayer,
                width
            )
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseImageTag;