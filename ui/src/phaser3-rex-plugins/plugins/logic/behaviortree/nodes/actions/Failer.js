import Action from '../Action.js';
import { FAILURE } from '../../constants.js';

class Failer extends Action {

    constructor({
        services,
        title,
        name = 'Failer'
    } = {}) {

        super({
            services,
            title,
            name,
        });
    }

    tick(tick) {
        return FAILURE;
    }
};

export default Failer;
