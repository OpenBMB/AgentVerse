import CustomCmd from './CustomCmd.js';
import WaitCmd from './WaitCmd.js';
import LabelCmd from './LabelCmd.js';
import ExitCmd from './ExitCmd.js';
import GotoCmd from './GotoCmd.js';
import IfCmd from './IfCmd.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CmdHandlers {
    constructor(scenario) {
        this.cmds = {
            '-': new CustomCmd(scenario),
            'wait': new WaitCmd(scenario),
            'label': new LabelCmd(scenario),
            'exit': new ExitCmd(scenario),
            'goto': new GotoCmd(scenario),
            'if': new IfCmd(scenario)
        };
    }

    resetFromJSON(o) {
        for (var name in this.cmds) {
            this.cmds[name].resetFromJSON(GetValue(o, name, undefined));
        }
        return this;
    }

    toJSON() {
        var ret = {};
        for (var name in this.cmds) {
            ret[name] = this.cmds[name].toJSON();
        }
        return ret;
    }    

    get(name) {
        return this.cmds[name];
    }

    isValidCmdName(name) {
        return this.cmds.hasOwnProperty(name);
    }
}
export default CmdHandlers;