import Action from '../Action.js';
import { ABORT } from '../../constants.js';

class Abort extends Action {

    constructor({
        services,
        title,
        name = 'Abort',
    } = {}) {

        super({
            services,
            title,
            name,
        });
    }

    tick(tick) {
        return ABORT;
    }
};

export default Abort;
