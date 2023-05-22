import BaseCmd from './BaseCmd.js';

class IfCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'if');
    }

    parse(inst, index) {
        inst.length = 4;
        var cond = '(' + this.getCond(inst) + ')';
        inst[1] = new Function('return ' + cond);
        return inst;
    }

    run(inst) {
        var condFn = this.getCond(inst);
        var result = condFn.call(this.scenario.scope);
        var nextLabel = (result)? this.getTrueLabel(inst) : this.getFalseLabel(inst);
        if (nextLabel !== '') {
            if (this.scenario.isDebugMode) {
                this.scenario.log('#IF ' + result + '- GOTO label: ' + nextLabel);
            }
            this.scenario.goto(nextLabel);
        }
    }

    getCond(inst) {
        var cond = inst[1];
        if ((cond == null) || (cond === '')) {
            cond = 'true';
            inst[1] = cond;
        }
        return cond;
    }

    getTrueLabel(inst) {
        var label = inst[2];
        if (label == null) {
            label = '';
            inst[2] = label;
        }
        return label;
    }

    getFalseLabel(inst) {
        var label = inst[3];
        if (label == null) {
            label = '';
            inst[3] = label;
        }
        return label;
    }
}

export default IfCmd;