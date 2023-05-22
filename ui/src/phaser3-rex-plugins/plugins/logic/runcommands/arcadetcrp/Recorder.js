import BaseRecorder from '../tcrp/Recorder.js';
import ArcadeStepClock from '../../../time/clock/ArcadeStepClock';

class Recorder extends BaseRecorder {
    constructor(parent, config) {
        if (config === undefined) {
            config = {};
        }
        config.clock = new ArcadeStepClock(parent);
        super(parent, config);
    }
}

export default Recorder;