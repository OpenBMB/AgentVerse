import TypeConvert from '../../../../utils/string/TypeConvert.js';

var ParseProperty = function (s, out) {
    var index = s.indexOf('=');
    if (index === -1) {
        out[s] = true;
    } else {
        var name = s.substring(0, index);
        var expression = s.substring(index + 1);
        out[name] = TypeConvert(expression);
    }

    return out;
}

export default ParseProperty;