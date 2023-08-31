import CustomNodeMapping from './CustomNodeMapping.js';
import RemoveItem from '../../../../utils/array/Remove.js';
import { BehaviorTree, PENDING, RUNNING } from '../../../behaviortree';
import DeepClone from '../../../../utils/object/DeepClone.js';

export default {
    // Override it
    addEventSheet(s, config) {

    },

    addTree(tree) {
        this.trees.push(tree);
        return this;
    },

    getTreeState(tree) {
        var treeID = (typeof (tree) === 'string') ? tree : tree.id;
        return this.blackboard.getTreeState(treeID);
    },

    clearAllEventSheets() {
        this.trees.forEach(function (tree) {
            this.blackboard.removeTreeData(tree.id);
        }, this)
        this.trees.length = 0;
        this.pendingTrees.length = 0;
        return this;
    },

    getEventSheetTitleList(out) {
        if (out === undefined) {
            out = [];
        }
        this.trees.forEach(function (tree) {
            out.push(tree.title);
        })
        return out;
    },

    removeEventSheet(title) {
        var removedTrees = [];
        this.trees.forEach(function (tree) {
            if (!tree.title === title) {
                return;
            }
            var status = this.getTreeState(tree);
            if (status === RUNNING) {
                // Can't remove RUNNING tree
                return;
            }

            removedTrees.push(tree);
            this.blackboard.removeTreeData(tree.id);
        }, this);

        if (removedTrees.length > 0) {
            RemoveItem(this.trees, removedTrees);
            RemoveItem(this.pendingTrees, removedTrees);
        }

        return this;
    },

    dumpTrees() {
        return this.trees.map(function (tree) {
            return tree.dump()
        })
    },

    loadTrees(data) {
        data.forEach(function (treeData) {
            var tree = new BehaviorTree({
                id: treeData.id,
                title: treeData.title,
                properties: DeepClone(treeData.properties),
            });
            tree.load(treeData, CustomNodeMapping);
            this.trees.push(tree);
        }, this);
        return this;
    },

}