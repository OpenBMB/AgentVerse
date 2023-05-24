import yaml from '../../yaml/yaml.js';

var ParseYAML = function (s) {
    if (typeof (s) === 'string') {
        try {
            return yaml.load(s);
        } catch (e) {
            console.log(e);
            return undefined;
        }
    }
    return s;
}

export default ParseYAML;