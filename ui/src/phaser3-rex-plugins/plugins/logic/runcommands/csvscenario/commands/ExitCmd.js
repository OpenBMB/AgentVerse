import BaseCmd from './BaseCmd.js';

class ExitCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'exit');
    }

    parse(inst, index) {
        inst.length = 1;
        return inst;
    }

    run(inst) {
        this.scenario.log('#EXIT');
        this.scenario.complete();         
    }
}

export default ExitCmd;