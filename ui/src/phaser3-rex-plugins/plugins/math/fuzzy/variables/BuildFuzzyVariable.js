import FuzzyVariable from './FuzzyVariable.js';
import BuildFuzzySet from './BuildFuzzySet';

var BuildFuzzyVariable = function (setsConfig) {
    var flv = new FuzzyVariable();
    for (var i = 0, cnt = setsConfig.length; i < cnt; i++) {
        var flvConfig = setsConfig[i]; // [setName, setType, left, middle, right, arg0]
        var fuzzySet = BuildFuzzySet(
            flvConfig,
            (i === 0) ? 0 : ((i == cnt - 1) ? 2 : 3)
        );
        fuzzySet.name = flvConfig.name;
        flv.add(fuzzySet);
    }
    return flv;
}

export default BuildFuzzyVariable;