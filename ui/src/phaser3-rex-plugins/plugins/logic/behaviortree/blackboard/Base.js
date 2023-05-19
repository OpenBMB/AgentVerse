import DeepClone from '../../../utils/object/DeepClone.js';

class Blackboard {

    constructor() {
        this._baseMemory = {};
        this._treeMemory = {};

        // Global memory : this._baseMemory
        // Tree memory : this._treeMemory[treeID]
        // Node memory : this._treeMemory[treeID].nodeMemory[nodeID]
    }

    _getTreeMemory(treeID) {
        if (!this._treeMemory[treeID]) {
            this._treeMemory[treeID] = {
                'nodeMemory': {},
            };
        }
        return this._treeMemory[treeID];
    }

    _getNodeMemory(treeMemory, nodeID) {
        var memory = treeMemory.nodeMemory;
        if (!memory[nodeID]) {
            memory[nodeID] = {};
        }

        return memory[nodeID];
    }

    _getMemory(treeID, nodeID) {
        var memory;

        if (treeID !== undefined) {
            memory = this._getTreeMemory(treeID);

            if (nodeID !== undefined) {
                memory = this._getNodeMemory(memory, nodeID);
            }
        } else {
            memory = this._baseMemory;
        }

        return memory;
    }

    set(key, value, treeID, nodeID) {
        var memory = this._getMemory(treeID, nodeID);
        memory[key] = value;
        return this;
    }

    setData(key, value, treeID, nodeID) {
        return this.set(key, value, treeID, nodeID);
    }

    get(key, treeID, nodeID) {
        var memory = this._getMemory(treeID, nodeID);
        return memory[key];
    }

    getData(key, treeID, nodeID) {
        return this.get(key, treeID, nodeID);
    }

    has(key, treeID, nodeID) {
        var memory;
        if (treeID !== undefined) {
            memory = this._treeMemory[treeID];
            if (memory && (nodeID !== undefined)) {
                memory = treeMemory.nodeMemory[nodeID];
            }
        } else {
            memory = this._baseMemory;
        }

        if (memory) {
            return memory.hasOwnProperty(key);
        } else {
            return false;
        }
    }

    hasData(key, treeID, nodeID) {
        return this.has(key, treeID, nodeID);
    }

    inc(key, inc, treeID, nodeID) {
        var value;
        if (this.has(key, treeID, nodeID)) {
            value = 0;
        } else {
            value = this.get(key, treeID, nodeID);
        }
        value += inc;
        this.set(key, value, treeID, nodeID);
        return this;
    }

    incData(key, inc, treeID, nodeID) {
        return this.inc(key, inc, treeID, nodeID);
    }

    toggle(key, treeID, nodeID) {
        var value;
        if (this.has(key, treeID, nodeID)) {
            value = false;
        } else {
            value = this.get(key, treeID, nodeID);
        }
        value = !value;
        this.set(key, value, treeID, nodeID);
        return this;
    }

    toggleData(key, treeID, nodeID) {
        return this.toggle(key, treeID, nodeID);
    }

    removeTree(treeID) {
        if (this._treeMemory[treeID]) {
            delete this._treeMemory[treeID];
        }
        return this;
    }

    removeTreeData(treeID) {
        return this.removeTree(treeID);
    }

    removeNode(treeID, nodeID) {
        var treeMemory = this._treeMemory[treeID];

        if (treeMemory && treeMemory.nodeMemory[nodeID]) {
            delete treeMemory.nodeMemory[nodeID];
        }
        return this;
    }

    removeNodeData(treeID, nodeID) {
        return this.removeNode(treeID, nodeID);
    }

    getGlobalMemory() {
        return this._baseMemory;
    }

    getTreeMemory(treeID) {
        return this._getTreeMemory(treeID);
    }

    getNodeMemory(treeID, nodeID) {
        return this._getNodeMemory(this._getTreeMemory(treeID), nodeID);
    }

    dump() {
        return {
            base: DeepClone(this._baseMemory),
            tree: DeepClone(this._treeMemory),
        }
    }

    load(data) {
        this._baseMemory = DeepClone(data.base);
        this._treeMemory = DeepClone(data.tree);
        return this;
    }
};

export default Blackboard;