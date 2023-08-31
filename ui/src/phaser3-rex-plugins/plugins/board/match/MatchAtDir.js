var MatchAtDir = function (pattern, startTileX, startTileY, direction) {
    // pattern: pattern list or repeat count
    var matchNMode = typeof (pattern) === 'number';
    var patternLength;
    if (matchNMode) {
        patternLength = pattern;
        pattern = null;
    } else {
        patternLength = pattern.length;
    }

    var symbol, wildcard = this.wildcard;
    var curTileXY;
    var board = this.board;
    var matchedTileXY = result.tileXY;
    matchedTileXY.length = 0;
    for (var i = 0; i < patternLength; i++) {
        if (curTileXY === undefined) {
            curTileXY = {
                x: startTileX,
                y: startTileY
            };
        } else {
            // get next tileXY 
            curTileXY = board.getNeighborTileXY(curTileXY, direction, curTileXY);
            if (curTileXY === null) {
                return false;
            }
        }

        symbol = this.getSymbol(curTileXY.x, curTileXY.y);
        if (symbol == null) {
            return false;
        }
        if (symbol !== wildcard) {
            if (matchNMode) {
                if (pattern === null) {
                    pattern = symbol;
                } else if (pattern !== symbol) {
                    return false;
                }
            } else if (pattern[i] !== symbol) { // pattern list mode
                return false;
            }
        }

        matchedTileXY.push({
            x: curTileXY.x,
            y: curTileXY.y
        });
    }

    result.direction = direction;
    result.pattern = pattern;
    return result;
};

var result = {
    tileXY: [],
    direction: undefined,
    pattern: undefined
};
export default MatchAtDir;