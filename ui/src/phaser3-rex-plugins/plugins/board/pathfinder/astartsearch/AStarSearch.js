/* 

javascript-astar 0.3.0
http://github.com/bgrins/javascript-astar
Freely distributable under the MIT License.
Implements the astar search algorithm in javascript using a Binary Heap.
Includes Binary Heap (with modifications) from Marijn Haverbeke.
http://eloquentjavascript.net/appendix2.html

*/

import NodeManager from './NodeManager.js';
import BinaryHeap from './BinaryHeap.js';
import CONST from '../const.js';

const AREA_MODE = CONST.AREA_MODE;
const PATH_MODE = CONST.PATH_MODE;

const ASTAR = CONST['A*'];
const ASTAR_LINE = CONST['A*-line'];
const ASTAR_RANDOM = CONST['A*-random'];

const BLOCKER = CONST.BLOCKER;
const INFINITY = CONST.INFINITY;

// global object
var gOpenHeap = new BinaryHeap(function (node) {
    return node.f;
});
// global object

var AStarSerach = function (startTileXYZ, endTileXY, movingPoints, mode) {
    if (this.nodeManager === undefined) {
        this.nodeManager = new NodeManager(this);
    }
    var nodeManager = this.nodeManager;
    nodeManager.freeAllNodes();

    // const isAreaSearch = (mode === AREA_MODE);
    const isPathSearch = (mode === PATH_MODE);
    const isAStarMode = (this.pathMode === ASTAR) || (this.pathMode === ASTAR_LINE) || (this.pathMode === ASTAR_RANDOM);
    const astarHeuristicEnable = isPathSearch && isAStarMode;
    const shortestPathEnable = isPathSearch && (!isAStarMode);
    const astarHeuristicMode =
        (!astarHeuristicEnable) ? null :
            (this.pathMode == ASTAR) ? 0 :
                (this.pathMode == ASTAR_LINE) ? 1 :
                    (this.pathMode == ASTAR_RANDOM) ? 2 :
                        null;

    var end = (endTileXY !== null) ? nodeManager.getNode(endTileXY.x, endTileXY.y, true) : null;
    var start = nodeManager.getNode(startTileXYZ.x, startTileXYZ.y, true);
    start.h = start.heuristic(end, astarHeuristicMode);

    // NEAREST NODE
    var closestNode;
    if (isPathSearch) {
        closestNode = start;
        closestNode.closerH = closestNode.h || closestNode.heuristic(end, 0);
    }
    // NEAREST NODE

    gOpenHeap.push(start);
    while (gOpenHeap.size() > 0) {
        // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
        var curNode = gOpenHeap.pop();

        // End case -- result has been found, return the traced path.
        if (isPathSearch && (curNode === end)) {
            closestNode = end;
            break;
        }

        // Normal case -- move curNode from open to closed, process each of its neighbors.
        curNode.closed = true;

        // Find all neighbors for the current node.
        var neighbors = curNode.getNeighborNodes();

        var neighbor, neighborCost, isNeighborMoreCloser;
        for (var i = 0, cnt = neighbors.length; i < cnt; ++i) {
            neighbor = neighbors[i];
            neighborCost = neighbor.getCost(curNode);
            if (neighbor.closed || (neighborCost === BLOCKER)) {
                // Not a valid node to process, skip to next neighbor.
                //log("("+neighbor.x+","+neighbor.y+") is closed");
                continue;
            }

            // The g score is the shortest distance from start to current node.
            // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
            var gScore = curNode.g + neighborCost,
                beenVisited = neighbor.visited;

            //log("("+curNode.x+","+curNode.y+") -> ("+neighbor.x+","+neighbor.y+")="+neighborCost+" ,acc="+gScore);
            if ((movingPoints != INFINITY) && (gScore > movingPoints)) {
                //log("("+neighbor.x+","+neighbor.y+") out of range");
                continue;
            }

            if ((!beenVisited) || (gScore < neighbor.g)) {

                // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                neighbor.visited = true;
                neighbor.preNodes.length = 0;
                neighbor.preNodes.push(curNode);
                neighbor.h = neighbor.h || neighbor.heuristic(end, astarHeuristicMode, start);
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;

                // NEAREST NODE
                if (isPathSearch) {
                    neighbor.closerH = neighbor.h || neighbor.heuristic(end, 0);
                    isNeighborMoreCloser = (neighbor.closerH < closestNode.closerH) ||
                        ((neighbor.closerH === closestNode.closerH) && (neighbor.g < closestNode.g));

                    if (isNeighborMoreCloser) {
                        closestNode = neighbor;
                    }
                }
                // NEAREST NODE

                if (!beenVisited) {
                    // Pushing to heap will put it in proper place based on the 'f' value.
                    gOpenHeap.push(neighbor);
                    //log("push ("+neighbor.x+","+neighbor.y+") ")
                } else {
                    // Already seen the node, but since it has been rescored we need to reorder it in the heap
                    gOpenHeap.rescoreElement(neighbor);
                    //log("reorder ("+neighbor.x+","+neighbor.y+") ")
                }
            } else if (shortestPathEnable && (gScore == neighbor.g)) {
                neighbor.preNodes.push(curNode);

                //if (neighbor.preNodes.indexOf(curNode) == -1)                    
                //    neighbor.preNodes.push(curNode);                    
                //else                    
                //    debugger;                 

                //log("drop ("+neighbor.x+","+neighbor.y+") ")                
            } else {
                //log("drop ("+neighbor.x+","+neighbor.y+") ")       
            }
        }

    }

    nodeManager.closestNode = (isPathSearch) ? closestNode : null;
    gOpenHeap.clear();
    return this;
}
export default AStarSerach;