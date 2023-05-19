import { Action, } from '../../behaviortree';
import IsEventEmitter from '../../../utils/system/IsEventEmitter.js';
import DeepClone from '../../../utils/object/DeepClone.js';

class TaskAction extends Action {
    constructor(config) {
        // config: {name, parameters:{...} }        
        super({
            name: 'TaskAction',
            title: config.name,
            properties: config,
        });

        this.isRunning = false;
    }

    open(tick) {
        this.isRunning = false;

        var taskData = this.properties;

        var taskName = taskData.name;
        if (!taskName) {
            return;
        }

        var treeManager = tick.blackboard.treeManager;
        var taskParameters = DeepClone(taskData.parameters);
        var taskHandlers = tick.target;
        var handler = taskHandlers[taskName];
        if (!handler) {
            if (taskHandlers.getHandler) {
                handler = taskHandlers.getHandler(taskName, taskParameters, treeManager);
            }
            if (!handler) {
                return;
            }
        }

        var eventEmitter = handler.call(taskHandlers, taskParameters, treeManager);
        if (IsEventEmitter(eventEmitter)) {
            this.isRunning = true;

            eventEmitter.once('complete', this.onTaskComplete, this);

            this.continueCallback = treeManager.continue.bind(treeManager);
            this.continueEE = eventEmitter;
        }
    }

    onTaskComplete() {
        this.isRunning = false;
        this.continueEE = undefined;

        this.continueCallback();
    }

    tick(tick) {
        return (this.isRunning) ? this.RUNNING : this.SUCCESS;
    }

    close(tick) {
    }

    abort(tick) {
        if (this.continueEE) {
            this.continueEE.off('complete', this.onTaskComplete, this);
            this.continueEE = undefined;
        }
    }
}

export default TaskAction