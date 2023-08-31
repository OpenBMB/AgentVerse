import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, ERROR, PENDING } from '../../constants.js';


class If extends Decorator {

    constructor(
        {
            expression = 'true',
            returnPending = false,
            child = null,
            title,
            name = 'If'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
                properties: {
                    expression,
                    returnPending
                },
            },
            nodePool
        );

        this.expression = this.addBooleanExpression(expression);
        this.returnPending = returnPending;
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // child is not running
        if (!this.isChildRunning(tick)) {
            // Return FAILURE to run next node
            if (!tick.evalExpression(this.expression)) {
                return FAILURE;
            } else if (this.returnPending) {
                this.openChild(); // Open child but not run it now
                return PENDING;
            }
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default If;