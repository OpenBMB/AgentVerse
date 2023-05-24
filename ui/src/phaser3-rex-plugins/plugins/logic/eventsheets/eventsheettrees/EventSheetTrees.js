import EventEmitter from 'eventemitter3';
import { BehaviorTree, Blackboard } from '../../behaviortree';
import TreeMethods from './methods/TreeMethods.js';
import DataMethods from './methods/DataMethods.js';
import StateMethods from './methods/StateMethods';
import ValueConvertMethods from './methods/ValueConvertMethods';
import RunMethods from './methods/RunMethods.js';

BehaviorTree.setStartIDValue(0);

class EventSheetTrees extends EventEmitter {
    constructor({
        taskHandlers,
        parallel = false,
    } = {}) {

        super();

        this.setTaskHandlers(taskHandlers);
        this.parallel = parallel;

        this.blackboard = new Blackboard();
        this.blackboard.treeManager = this; // For TaskAction

        this.trees = [];
        this.pendingTrees = [];
        this.closedTrees = [];  // Temporary tree array

        this.isRunning = false;
        this._threadKey = null;
    }

    get memory() {
        return this.blackboard.getGlobalMemory();
    }

    setTaskHandlers(taskHandlers) {
        this.taskHandlers = taskHandlers;
        return this;
    }

}

Object.assign(
    EventSheetTrees.prototype,
    TreeMethods,
    DataMethods,
    StateMethods,
    ValueConvertMethods,
    RunMethods,
)

export default EventSheetTrees;