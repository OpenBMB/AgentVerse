var PropToTagText = function (text, prop, prevProp) {
    if (prevProp == null) {
        prevProp = EMPTYPROP;
    }

    var headers = [];

    for (var k in prevProp) {
        if (!prop.hasOwnProperty(k)) {
            headers.push(`[/${k}]`);
        }
    }

    for (var k in prop) {
        var value = prop[k];

        if (prevProp[k] === value) {
            continue;
        }

        switch (k) {
            case 'size':
                headers.push(`[size=${value.replace('px', '')}]`);
                break;

            case 'color':
            case 'weight':
            case 'stroke':
            case 'y':
            case 'img':
            case 'area':
            case 'url':
            case 'align':
                headers.push(`[${k}=${value}]`);
                break;

            case 'u':
                if (value === true) {
                    headers.push('[u]');
                } else {
                    headers.push(`[u=${value}]`)
                }
                break;

            default:
                headers.push(`[${k}]`);
                break;
        }
    }

    headers.push(text);

    return headers.join('');
}

var EMPTYPROP = {};


export default PropToTagText;