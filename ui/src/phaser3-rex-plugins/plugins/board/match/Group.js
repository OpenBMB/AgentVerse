import Clear from '../../utils/object/Clear.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';
import IsArray from '../../utils/object/IsArray.js';

var Group = function (startTileX, startTileY, out) {
    if (out === undefined) {
        out = [];
    }

    var board = this.board;
    var wildcard = this.wildcard;
    var targetSymbol = this.getSymbol(startTileX, startTileY);
    if ((targetSymbol == null) || (targetSymbol === wildcard)) {
        return out;
    }

    if (globalQueue === undefined) {
        globalQueue = new Queue();
    }

    var curTileXY, symbol;
    globalQueue.push(startTileX, startTileY);
    while (globalQueue.length) {
        curTileXY = globalQueue.pop();
        symbol = this.getSymbol(curTileXY.x, curTileXY.y);
        if ((symbol === targetSymbol) || (symbol === wildcard)) {
            out.push(curTileXY);
            globalQueue.push(board.getNeighborTileXY(curTileXY));
        }
    }

    globalQueue.clear();
    return out;
}

class Queue {
    constructor() {
        this.data = [];
        this.visited = {};
    }

    push(x, y) {
        if (IsArray(x)) {
            var xyArray = x;
            for (var i = 0, cnt = xyArray.length; i < cnt; i++) {
                this.push(xyArray[i]);
            }
            return this;
        }

        if (IsPlainObject(x)) {
            var xy = x;
            x = xy.x;
            y = xy.y;
        }
        var key = `${x},${y}`;
        if (this.visited.hasOwnProperty(key)) {
            return this;
        }

        this.data.push({ x: x, y: y });
        this.visited[key] = true;
        return this;
    }

    pop() {
        return this.data.pop();
    }

    get length() {
        return this.data.length;
    }

    clear() {
        Clear(this.data);
        Clear(this.visited);
        return this;
    }
}

var globalQueue;

export default Group;