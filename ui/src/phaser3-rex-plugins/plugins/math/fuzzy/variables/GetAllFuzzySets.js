var GetAllFuzzySets = function (fuzzyModule) {
    var allFuzzySets = {};
    var flvs = fuzzyModule.flvs;
    for (var name in flvs) {
        var FLVFuzzySets = flvs[name].fuzzySets;
        for (var i = 0, cnt = FLVFuzzySets.length; i < cnt; i++) {
            var fuzzySet = FLVFuzzySets[i];
            allFuzzySets[fuzzySet.name] = fuzzySet;
        }
    }
    return allFuzzySets;
}

export default GetAllFuzzySets;