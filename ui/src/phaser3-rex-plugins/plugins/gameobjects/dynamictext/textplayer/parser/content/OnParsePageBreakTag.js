import AppendTextBase from '../../../dynamictext/methods/AppendText.js';

var OnParsePageBreakTag = function (textPlayer, parser, config) {
    var tagNames = ['pagebreak', 'pb'];
    for (var i = 0, cnt = tagNames.length; i < cnt; i++) {
        var tagName = tagNames[i];
        parser
            .on(`+${tagName}`, function () {
                AppendTextBase.call(textPlayer, '\f');
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            })
    }

}

export default OnParsePageBreakTag;