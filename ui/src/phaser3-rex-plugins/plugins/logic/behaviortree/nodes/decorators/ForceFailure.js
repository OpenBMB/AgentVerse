import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, RUNNING, ABORT, ERROR } from '../../constants.js';


class ForceFailure extends Decorator {

    constructor(
        {
            child = null,
            title,
            name = 'ForceFailure'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
                properties: {
                },
            },
            nodePool
        );

    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var status = this.child._execute(tick);

        if (status === SUCCESS) {
            return FAILURE;
        }

        return status;
    }
};

export default ForceFailure;