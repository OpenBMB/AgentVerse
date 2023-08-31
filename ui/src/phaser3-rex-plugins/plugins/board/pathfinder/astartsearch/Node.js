import Shuffle from '../../../utils/array/Shuffle.js';
import AngleBetween from '../../../utils/math/angle/Between.js';

class Node {
    constructor() {
        this.preNodes = [];
        this.manager = undefined;
    }

    reset(manager) {
        this.manager = manager;
        // overwrite
        this.sn = undefined; // for sorting by created order        
        this.key = undefined;
        this.x = undefined;
        this.y = undefined;
        this.isTileXYZ = true;
        // overwrite

        this._px = undefined;
        this._py = undefined;
        this.cost = undefined; // cost cache
        this.f = 0;
        this.g = 0; // path cost
        this.h = 0;
        this.closerH = 0;
        this.visited = false;
        this.closed = false;
        this.preNodes.length = 0;
    }

    destroy() {
        this.preNodes.length = 0;
        this.manager = undefined;
    }

    heuristic(endNode, pathMode, baseNode) {
        if (pathMode === null) {
            return 0;
        }

        var h, dist = this.board.getDistance(endNode, this, true) * this.pathFinder.weight;

        if ((pathMode === 1) && (baseNode !== undefined)) {
            var deltaAngle = endNode.angleTo(baseNode) - this.angleTo(baseNode);
            h = dist + Math.abs(deltaAngle);
        } else if (pathMode === 2) {
            h = dist + Math.random();
        } else {
            h = dist;
        }

        return h;
    }

    getNeighborNodes() {
        var neighborsTileXY = this.board.getNeighborTileXY(this);
        if (this.pathFinder.shuffleNeighbors) {
            Shuffle(neighborsTileXY);
        }

        var node, neighborNodes = [];
        for (var i = 0, cnt = neighborsTileXY.length; i < cnt; i++) {
            node = this.manager.getNode(neighborsTileXY[i], true);
            neighborNodes.push(node)
        }
        return neighborNodes;
    }

    getCost(preNode) {
        if (this.pathFinder.cacheCost) {
            if (this.cost === undefined) {
                this.cost = this.pathFinder.getCost(this, preNode);
            }
        } else {
            this.cost = this.pathFinder.getCost(this, preNode);
        }
        return this.cost;
    }

    angleTo(endNode) {
        return AngleBetween(this.worldX, this.wroldY, endNode.worldX, endNode.wroldY);
    }

    get pathFinder() {
        return this.manager.pathFinder;
    }

    get board() {
        return this.manager.pathFinder.board;
    }

    get worldX() {
        if (this._px === undefined) {
            this._px = this.board.tileXYToWroldX(this.x, this.y);
        }
        return this._px;
    }

    get wroldY() {
        if (this._py === undefined) {
            this._py = this.board.tileXYToWroldY(this.x, this.y);
        }
        return this._py;
    }

    get pathCost() {
        return this.g;
    }
}

export default Node;