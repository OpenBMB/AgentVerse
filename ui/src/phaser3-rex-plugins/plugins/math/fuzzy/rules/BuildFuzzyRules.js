import BuildFuzzyRule from './BuildFuzzyRule';
import IsInvalidLine from '../utils/IsInvalidLine';

var BuildFuzzyRules = function (fuzzyModule, rules, fuzzySets) {
    if (typeof (rules) === 'string') {
        rules = rules.split('\n');
    }
    for (var i = 0, cnt = rules.length; i < cnt; i++) {
        var rule = rules[i];
        if (IsInvalidLine(rule)) {
            continue;
        }
        fuzzyModule.addRule(BuildFuzzyRule(rule, fuzzySets));
    }
}

export default BuildFuzzyRules;