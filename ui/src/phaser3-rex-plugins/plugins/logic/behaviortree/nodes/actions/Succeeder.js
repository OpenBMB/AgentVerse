import Action from '../Action.js';
import { SUCCESS } from '../../constants.js';

class Succeeder extends Action {

    constructor({
        services,
        title,
        name = 'Succeeder'
    } = {}) {

        super({
            services,
            title,
            name,
        });
    }

    tick(tick) {
        return SUCCESS;
    }
};

export default Succeeder;
