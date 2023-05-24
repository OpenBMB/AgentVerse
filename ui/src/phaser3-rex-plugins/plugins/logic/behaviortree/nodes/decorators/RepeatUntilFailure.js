import Decorator from '../Decorator.js';
import { SUCCESS, FAILURE, ERROR } from '../../constants.js';

class RepeatUntilFailure extends Decorator {

    constructor(
        {
            maxLoop = -1,
            returnSuccess = false,
            child = null,
            title,
            name = 'RepeatUntilFailure',
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
                properties: {
                    returnSuccess,
                    maxLoop
                },
            },
            nodePool
        );

        this.maxLoopExpression = this.addExpression(maxLoop);
        this.returnSuccess = returnSuccess;
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
        var status = ERROR;

        // Open child before exceed maxLoop
        // Execute child many times in a tick
        while ((maxLoop < 0) || (i < maxLoop)) {
            status = this.child._execute(tick);

            if (status === SUCCESS) {
                i++;
            } else {
                break;
            }
        }

        nodeMemory.$i = i;

        if ((status === this.FAILURE) && this.returnSuccess) {
            status = SUCCESS;
        }

        return status;
    }
};

export default RepeatUntilFailure;
