import { TREE, TREE_STATE, IDLE } from '../constants.js'
import { CreateID, SetSerialNumber, SetSerialNumberPrefix, GetSerialNumber } from '../utils/CreateID.js';
import Dump from './Dump.js';
import Load from './Load.js';
import Tick from '../tick/Tick.js';
import { BreadthFirstSearch } from './Traversal.js';

class BehaviorTree {

    constructor(
        {
            id,
            title,
            description,
            properties,
            root = null
        } = {}
    ) {

        if (id === undefined) {
            id = CreateID();
        }

        this.id = id;

        this.category = TREE;

        this.title = title || '';

        this.description = description || '';

        this.properties = properties || {};

        this._root = root;

        this.ticker = new Tick();
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }

    setRoot(node) {
        this.root = node;
        return this;
    }

    getRoot() {
        return this.root;
    }

    get root() {
        return this._root;
    }

    set root(node) {
        if (node) {
            this._root = node;
            node.setParent(this);
        } else {
            if (this._root) {
                this._root.setParent(null);
            }
            this._root = null;
        }
    }

    forEachNode(callback, scope) {
        BreadthFirstSearch(this.root, callback, scope);
        return this;
    }

    getAllNodes(out) {
        if (out === undefined) {
            out = [];
        }
        this.forEachNode(function (node) {
            out.push(node)
        })
        return out;
    }

    getChildrenNodes(parent, out) {
        if (parent === undefined) {
            parent = this.root;
        }
        if (out === undefined) {
            out = [];
        }

        BreadthFirstSearch(parent, function (node) {
            out.push(node)
        });

        return out;
    }

    tick(blackboard, target) {
        if (!blackboard) {
            throw 'The blackboard parameter is obligatory and must be an instance of Blackboard';
        }

        var ticker = this.ticker;
        ticker
            .setBlackBoard(blackboard)
            .setTree(this)
            .setTarget(target)
            .reset();

        /* TICK NODE */
        var state = this.root._execute(ticker);

        /* POPULATE BLACKBOARD */
        // blackboard.set('$openNodes', ticker._openNodes.slice(0), this.id);
        // blackboard.set('$nodeCount', ticker._nodeCount, this.id);
        blackboard.set(TREE_STATE, state, this.id);

        return state;
    }

    abort(blackboard, target) {
        if (!blackboard) {
            throw 'The blackboard parameter is obligatory and must be an instance of Blackboard';
        }

        var ticker = this.ticker;
        ticker
            .setBlackBoard(blackboard)
            .setTree(this)
            .setTarget(target)
            .reset();

        /* ABORT NODE */
        this.root.abortChildren(ticker);

        /* POPULATE BLACKBOARD */
        blackboard.set(TREE_STATE, IDLE, this.id);

        return IDLE;
    }

    getState(blackboard) {
        return blackboard.get(TREE_STATE, this.id);
    }

    resetState(blackboard) {
        blackboard.set(TREE_STATE, IDLE, this.id);
        return this;
    }

    static setStartIDValue(value) {
        SetSerialNumber(value);
    }

    static getSerialNumber() {
        return GetSerialNumber();
    }

    static setSerialIDPrefix(prefix) {
        SetSerialNumberPrefix(prefix);
    }
};

var Methods = {
    dump: Dump,
    load: Load,
}
Object.assign(
    BehaviorTree.prototype,
    Methods
);

export default BehaviorTree;