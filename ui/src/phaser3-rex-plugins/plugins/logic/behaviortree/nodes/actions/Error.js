import Action from '../Action.js';
import { ERROR } from '../../constants.js';

class Error extends Action {

    constructor({
        services,
        title,
        name = 'Error',
    } = {}) {

        super({
            services,
            title,
            name,
        });
    }

    tick(tick) {
        return ERROR;
    }
};

export default Error;
