import { BehaviorTree, IfSelector } from '../../behaviortree';

class EventBehaviorTree extends BehaviorTree {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }
        super(config);

        var { parallel = false } = config
        this.properties.parallel = parallel;

        var { condition = 'true' } = config;
        var root = new IfSelector({
            title: this.title,
            expression: condition,
            returnPending: true   // Always return PENDING instead of RUNNING, or SUCCESS
        })
        this.setRoot(root);
    }

    get isParallel() {
        return this.properties.parallel;
    }

    get eventConditionPassed() {
        var nodeMemory = this.root.getNodeMemory(this.ticker);
        return (nodeMemory.$runningChild === 0);
    }
}

export default EventBehaviorTree;