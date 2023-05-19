import Pool from '../../../pool.js';
import TileXYToKey from '../../utils/tilexyzkey/TileXYToKey.js';
import Node from './Node.js';

// global object
var NodesPool = new Pool(); // recycle dead nodes
// global object

class NodeCache {
    constructor(pathFinder) {
        this.sn = 0;
        this.pool = NodesPool;
        this.nodes = {}; // {tileXYKey:node}
        this.pathFinder = pathFinder;
        this.closestNode = null;
    }

    destroy() {
        this.freeAllNodes();
        this.pathFinder = null;
        this.pool = undefined;
        return this;
    }

    getNode(tileX, tileY, createNewNode) {
        var key;
        switch (typeof (tileX)) {
            case 'number': // (tileX, tileY, createNewNode)
                key = TileXYToKey(tileX, tileY);
                break;
            case 'string': // (key, createNewNode)
                key = tileX;
                createNewNode = tileY;
                break;
            default: // (tileXY, createNewNode)
                var tileXY = tileX;
                createNewNode = tileY;
                tileX = tileXY.x;
                tileY = tileXY.y;
                key = TileXYToKey(tileX, tileY);
                break;
        }
        if (createNewNode === undefined) {
            createNewNode = false;
        }

        this.sn++;
        if (!this.nodes.hasOwnProperty(key)) {
            if (!createNewNode) {
                return null;
            }

            var node = this.pool.pop();
            if (node === null) {
                node = new Node();
            }
            node.reset(this);
            node.sn = this.sn;
            node.key = key;
            node.x = tileX;
            node.y = tileY;
            this.nodes[key] = node;
        }
        return this.nodes[key];
    }

    freeAllNodes() {
        this.closestNode = null;
        var nodes = this.nodes,
            pool = this.pool;
        var node;
        for (var key in nodes) {
            node = nodes[key];
            node.destroy();
            pool.push(node);
            delete nodes[key];
        }
        this.sn = 0;
        return this;
    }

    getAllNodes() {
        return this.nodes;
    }
}
export default NodeCache;