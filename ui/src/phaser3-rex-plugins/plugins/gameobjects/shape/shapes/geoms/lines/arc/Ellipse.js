import Arc from './Arc.js';

class Ellipse extends Arc {
    constructor(x, y, radiusX, radiusY) {
        super(x, y, radiusX, radiusY, 0, 360);
    }
}

export default Ellipse;