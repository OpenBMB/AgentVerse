import Arc from './Arc.js';

class Circle extends Arc {
    constructor(x, y, radius) {
        super(x, y, radius, radius, 0, 360);
    }
}

export default Circle;