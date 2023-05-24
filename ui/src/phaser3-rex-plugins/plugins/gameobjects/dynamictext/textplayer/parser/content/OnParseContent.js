import AppendTextBase from '../../../dynamictext/methods/AppendText.js';

var OnParseContent = function (textPlayer, parser, config) {
    parser
        .on('content', function (content) {
            if (parser.contentOutputEnable) {
                AppendTextBase.call(textPlayer, content);
            } else {
                var startTag = `+${parser.lastTagStart}`;
                textPlayer.emit(`parser.${startTag}#content`, parser, content);
            }
        })
}

export default OnParseContent;