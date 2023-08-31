import AppendTextBase from '../../../dynamictext/methods/AppendText.js';

var OnParseNewLineTag = function (textPlayer, parser, config) {
    var tagName = 'r';
    parser
        .on(`+${tagName}`, function () {
            AppendTextBase.call(textPlayer, '\n');
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseNewLineTag;