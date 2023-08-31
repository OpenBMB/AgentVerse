import Sizer from '../sizer/Sizer.js';
import Build from './methods/Build.js'

class HolyGrail extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        config.orientation = 1; // top-to-bottom
        // Create sizer
        super(scene, config);
        this.type = 'rexHolyGrail';

        this.build(config);
    }
}

var methods = {
    build: Build,
}

Object.assign(
    HolyGrail.prototype,
    methods,
)

export default HolyGrail;