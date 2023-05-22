import { Sequence, SUCCESS, FAILURE } from '../../behaviortree';

class TaskSequence extends Sequence {
    open(tick) {
        super.open(tick);

        var treeManager = tick.blackboard.treeManager;
        treeManager.emit('label.enter', this.title, treeManager);

    }

    tick(tick) {
        var status = super.tick(tick);
        // Turn FAILURE by SUCCESS
        if (status === FAILURE) {
            status = SUCCESS;
        }
        return status;
    }

    close(tick) {
        super.close(tick);

        var treeManager = tick.blackboard.treeManager;
        treeManager.emit('label.exit', this.title, treeManager);
    }
}

export default TaskSequence;