import BaseCmd from './BaseCmd.js';

class GotoCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'goto');
    }

    parse(inst, index) {
        inst.length = 2;
        return inst;
    }

    run(inst) {
        var label = this.getLabel(inst);
        if (this.scenario.isDebugMode) {
            this.scenario.log('#GOTO label: ' + label);
        }
        this.scenario.goto(label);
    }

    getLabel(inst) {
        var label = inst[1];
        if (label == null) {
            label = '';
            inst[1] = label;
        }
        return label;
    }
}

export default GotoCmd;