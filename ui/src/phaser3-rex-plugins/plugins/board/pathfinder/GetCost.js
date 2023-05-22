import CONST from './const.js';

const BLOCKER = CONST.BLOCKER;

var GetCost = function (curNode, preNode) {
    // Occupied test
    if (this.occupiedTest) {
        if (this.board.contains(curNode.x, curNode.y, this.chessData.tileXYZ.z)) {
            return BLOCKER;
        }
    }
    // Blocker test
    if (this.blockerTest) {
        if (this.board.hasBlocker(curNode.x, curNode.y)) {
            return BLOCKER;
        }
    }
    // Edge-blocker test
    if (this.edgeBlockerTest) {
        // TODO
    }

    if (typeof (this.costCallback) === 'number') {
        return this.costCallback;
    } else {
        var cost;
        if (this.costCallbackScope) {
            cost = this.costCallback.call(this.costCallbackScope, curNode, preNode, this);
        } else {
            cost = this.costCallback(curNode, preNode, this);
        }
        if (cost === undefined) {
            cost = BLOCKER;
        }
        return cost;
    }
}
export default GetCost;