import  FuzzyRule  from './FuzzyRule.js';
import  FuzzyAND  from './operators/FuzzyAND.js';
import  FuzzyOR  from './operators/FuzzyOR.js';
import  FuzzyFAIRLY  from './operators/FuzzyFAIRLY.js'
import  FuzzyVERY  from './operators/FuzzyVERY.js'
import Parse from '../utils/parser/Parse';

var BuildFuzzyRule = function (ruleInput, fuzzySets) {
    var ruleJson = Parse(ruleInput);
    var antecedent = BuildFuzzyCompositeTerm(ruleJson[1], fuzzySets);
    var consequence = fuzzySets[ruleJson[2]];
    var rule = new FuzzyRule(antecedent, consequence);
    return rule;
}

var BuildFuzzyCompositeTerm = function (terms, fuzzySets) {
    // terms: undefined, string, or array
    if (!terms) {
        return null;
    } else if (typeof (terms) === 'string') {
        if (!fuzzySets.hasOwnProperty(terms)) {
            throw `Can't find fuzzy set ${terms}`;
        }
        return fuzzySets[terms];
    }

    // Array
    var operations = [];
    for (var i = 1, cnt = terms.length; i < cnt; i++) {
        operations.push(BuildFuzzyCompositeTerm(terms[i], fuzzySets));
    }
    var operatorClass = OperatorClasses[terms[0]];
    var operator = new operatorClass(...operations);
    return operator;
}

const OperatorClasses = {
    and: FuzzyAND,
    or: FuzzyOR,
    fairly: FuzzyFAIRLY,
    very: FuzzyVERY
}

export default BuildFuzzyRule;