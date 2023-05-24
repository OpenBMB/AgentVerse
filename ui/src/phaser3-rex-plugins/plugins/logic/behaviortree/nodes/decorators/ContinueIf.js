import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';


class ContinueIf extends Decorator {

    constructor(
        {
            expression = 'true',
            returnSuccess = true,
            child = null,
            title,
            name = 'ContinueIf'
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
                    returnSuccess,
                },
            },
            nodePool
        );

        this.expression = this.addBooleanExpression(expression);
        this.returnSuccess = returnSuccess;
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // child is running
        if (this.isChildRunning(tick)) {
            // Abort child if eval result is false
            if (!tick.evalExpression(this.expression)) {
                return (this.returnSuccess) ? SUCCESS : FAILURE;
            }
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default ContinueIf;