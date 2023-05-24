import BaseCmd from './BaseCmd.js';

class WaitCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'wait');
    }

    parse(inst, index) {
        inst.length = 2;
        var eventName = this.getEventName(inst);
        if (!isNaN(eventName)) {
            inst[1] = parseFloat(eventName);
        }
        return inst;
    }

    run(inst) {
        var eventName = this.getEventName(inst);
        if (typeof (eventName) === 'number') {
            this.waitTime(eventName);
        } else {
            this.waitEvent(eventName);
        }
    }

    waitTime(delayTime) {
        if (delayTime > this.scenario.offset) {
            delayTime -= this.scenario.offset;
            this.scenario.offset = 0;
            if (this.scenario.isDebugMode) {
                this.scenario.log('#WAIT: ' + delayTime);
            }
            this.scenario.wait(delayTime);
        } else {
            this.scenario.offset -= delayTime;
        }
    }

    waitEvent(eventName) {
        if (this.scenario.isDebugMode) {
            this.scenario.log('#WAIT: ' + eventName);
        }
        this.scenario.wait(eventName);
    }

    getEventName(inst) {
        var eventName = inst[1];
        if (eventName == null) {
            eventName = '';
            inst[1] = eventName;
        }
        return eventName;
    }
}

export default WaitCmd;