import GridTable from '../gridtable/GridTable.js';
import Methods from './methods/Methods.js';

class Carousel extends GridTable {
    constructor(scene, x, y, width, height, config) {
        if (config === undefined) {
            config = {};
        }
        config.columns = 1; // Force columns to 1
        if (!config.hasOwnProperty('clamplTableOXY')) {
            config.clamplTableOXY = false;
        }

        super(scene, x, y, width, height, config);
        this.type = 'rexCarousel';

    }
}

// mixin
Object.assign(
    Carousel.prototype,
    Methods
);

export default Carousel;