import RefreshSymbolCache from './RefreshSymbolCache.js';
import GetMatchN from './GetMatchN.js';

const SetStruct = Phaser.Structs.Set;
var GetAllMatch = function () {
    RefreshSymbolCache.call(this) // only refresh symbol cache once
    // Get match5, match4, match3
    var self = this;
    var matchLines = [];
    for (var n = 5; n >= 3; n--) {
        GetMatchN.call(this, n, function (result, board) {
            var newSet = new SetStruct(board.tileXYArrayToChessArray(result.tileXY, self.chessTileZ));
            for (var i = 0, cnt = matchLines.length; i < cnt; i++) {
                if (subSetTest(matchLines[i], newSet)) {
                    return; // not a new set
                }
            }
            matchLines.push(newSet);
        });
    }
    return matchLines;
}

var subSetTest = function (setA, setB) {
    // Return true if setB is a subset of setA
    var itemsA = setA.entries;
    for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
        if (!setB.contains(itemsA[i])) {
            return false;
        }
    }
    return true;
};

export default GetAllMatch;