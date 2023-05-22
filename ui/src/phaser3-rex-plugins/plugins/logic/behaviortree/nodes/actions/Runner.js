import Action from '../Action.js';
import { RUNNING } from '../../constants.js';

class Runner extends Action {

    constructor({
        services,
        title,
        name = 'Runner'
    } = {}) {

        super({
            services,
            title,
            name,
        });
    }

    tick(tick) {
        return RUNNING;
    }
};

export default Runner;
