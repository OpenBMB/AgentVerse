import yaml from 'js-yaml';

var ParseYaml = function (ymlString) {
    var doc;
    try {
        doc = yaml.load(ymlString);
    } catch (e) {
        console.log(e);
    }
    return doc;
}

export default ParseYaml;