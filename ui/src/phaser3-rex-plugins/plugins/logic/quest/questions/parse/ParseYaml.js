import yaml from 'js-yaml';

var ParseYaml = function (yamlString, config) {
    var items = [];
    if (Array.isArray(yamlString)) {
        yamlString.forEach(function (s) {
            try {
                items.push(yaml.load(s, config));
            } catch (e) {
                console.log(e);
            }
        })

    } else {
        try {
            yaml.loadAll(yamlString, function (item) {
                items.push(item);
            }, config);
        } catch (e) {
            console.log(e);
        }
    }

    return items;
}

export default ParseYaml;