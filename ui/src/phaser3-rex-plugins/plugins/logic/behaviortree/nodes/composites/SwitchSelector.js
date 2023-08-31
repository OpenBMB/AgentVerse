import Composite from '../Composite.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants.js';

class SwitchSelector extends Composite {
    constructor(
        {
            expression = null,
            keys = undefined, // Or [key, ...]
            children = {},    // Or [child, ...]
            services,
            title,
            name = 'SwitchSelector'
        } = {},
        nodePool
    ) {

        if (keys === undefined) {
            keys = Object.keys(children);
            children = Object.values(children);
        }

        super(
            {
                children: children,
                services,
                title,
                name,
                properties: {
                    expression,
                    keys
                },
            },
            nodePool
        );

        this.expression = this.addExpression(expression);

        this.keys = keys;  // Index of children
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = -1;  // No running child
    }

    tick(tick) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);
        var childIndex = nodeMemory.$runningChild;
        if (childIndex < 0) {
            var key = tick.evalExpression(this.expression);
            childIndex = this.keys.indexOf(key);
            if (childIndex === -1) {
                childIndex = this.keys.indexOf('default');
            }
            if (childIndex === -1) {
                return ERROR;
            }
        }

        var child = this.children[childIndex];
        var status = child._execute(tick);
        nodeMemory.$runningChild = (status === RUNNING) ? childIndex : -1;
        return status;
    }

    abortChildren(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var child = this.children[nodeMemory.$runningChild];
        if (child) {
            child._abort(tick);
            nodeMemory.$runningChild = -1;
        }
    }
};

export default SwitchSelector;