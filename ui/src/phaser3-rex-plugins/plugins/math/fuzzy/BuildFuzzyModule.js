import FuzzyModule from './FuzzyModule.js';
import BuildFuzzyVariables from './variables/BuildFuzzyVariables.js';
import GetAllFuzzySets from './variables/GetAllFuzzySets.js';
import BuildFuzzyRules from './rules/BuildFuzzyRules.js';
import IsInvalidLine from './utils/IsInvalidLine.js';

var BuildFuzzyModule = function (config) {
    if (typeof (config) === 'string') {
        var variables = [];
        var rules = [];
        var lines = config.split('\n');
        for (var i = 0, cnt = lines.length; i < cnt; i++) {
            var line = lines[i];
            if (IsInvalidLine(line)) {
                continue;
            }
            if (line.indexOf('=>') !== -1) {
                rules.push(line);
            } else {
                variables.push(line);
            }
        }
        config = {
            variables: variables,
            rules: rules
        }
    }

    var fuzzyModule = new FuzzyModule();
    BuildFuzzyVariables(fuzzyModule, config.variables);
    BuildFuzzyRules(fuzzyModule, config.rules, GetAllFuzzySets(fuzzyModule));

    return fuzzyModule;
}

export default BuildFuzzyModule;