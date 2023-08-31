import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';

class Limiter extends Decorator {

    constructor(
        {
            maxLoop = 1,
            child = null,
            title,
            name = 'Limiter'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
                properties: {
                    maxLoop
                },
            },
            nodePool
        );

        this.maxLoopExpression = this.addExpression(maxLoop);
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$maxLoop = tick.evalExpression(this.maxLoopExpression);
        nodeMemory.$i = 0;
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // Won't abort child
        var nodeMemory = this.getNodeMemory(tick);
        var maxLoop = nodeMemory.$maxLoop;
        var i = nodeMemory.$i;

        // Open child before exceed maxLoop
        // Execute child 1 time in a tick
        if (i >= maxLoop) {
            return FAILURE;
        }

        var status = this.child._execute(tick);
        if ((status === SUCCESS) || (status === FAILURE)) {
            nodeMemory.$i = i + 1;
        }

        return status;
    }
};

export default Limiter;