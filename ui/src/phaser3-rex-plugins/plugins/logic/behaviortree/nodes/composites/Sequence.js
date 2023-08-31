import Composite from '../Composite.js';
import { SUCCESS, FAILURE, RUNNING, ABORT, ERROR } from '../../constants.js';

class Sequence extends Composite {
    constructor(
        {
            children = [],
            services,
            title,
            name = 'Sequence'
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
    }

    tick(tick) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);

        var childIndex = nodeMemory.$runningChild;
        var status;
        for (var i = childIndex, cnt = this.children.length; i < cnt; i++) {
            status = this.children[i]._execute(tick);

            if ((status === RUNNING) || (status === FAILURE) || (status === ABORT)) {
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

export default Sequence;