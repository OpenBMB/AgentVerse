import ExtractByPrefix from '../../../../plugins/utils/object/ExtractByPrefix.js';

var ExtractStyle = function (config, prefix, propertiesMap) {
    var result = ExtractByPrefix(config, prefix);

    if (propertiesMap) {
        for (var name in result) {
            if (propertiesMap.hasOwnProperty(name)) {
                result[propertiesMap[name]] = result[name];
                delete result[name];
            }
        }
    }

    return result;
}

export default ExtractStyle