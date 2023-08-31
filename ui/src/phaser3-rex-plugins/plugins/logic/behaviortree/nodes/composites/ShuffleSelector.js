import Composite from '../Composite.js';
import Shuffle from '../../../../utils/array/Shuffle.js';
import { SUCCESS, FAILURE, RUNNING, ABORT, ERROR } from '../../constants.js';

class ShuffleSelector extends Composite {
    constructor(
        {
            children = [],
            services,
            title,
            name = 'ShuffleSelector'
        } = {},
        nodePool
    ) {

        super(
            {
                children,
                services,
                title,
                name,
            },
            nodePool
        );

    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = 0;

        if (!nodeMemory.$children) {
            nodeMemory.$children = this.children.map((child, index) => index);
        }
        Shuffle(nodeMemory.$children);
    }

    tick(tick) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);

        var childIndex = nodeMemory.$runningChild;
        var children = nodeMemory.$children;
        var status;
        for (var i = childIndex, cnt = children.length; i < cnt; i++) {
            status = this.children[children[i]]._execute(tick);

            if ((status === RUNNING) || (status === SUCCESS) || (status === ABORT)) {
                break;
            }
        }

        nodeMemory.$runningChild = (status === RUNNING) ? i : -1;
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

export default ShuffleSelector;