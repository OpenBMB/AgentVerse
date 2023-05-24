import Decorator from '../Decorator.js';
import { RUNNING, FAILURE, SUCCESS, ABORT, ERROR } from '../../constants.js';


class ForceSuccess extends Decorator {

    constructor(
        {
            child = null,
            title,
            name = 'ForceSuccess'
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

        if (status === FAILURE) {
            return SUCCESS;
        }

        return status;
    }
};

export default ForceSuccess;