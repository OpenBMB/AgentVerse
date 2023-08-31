import BaseCmd from './BaseCmd.js';
import Clone from '../../../../utils/object/Clone.js';
import Clear from '../../../../utils/object/Clear.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class LabelCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'label');

        this.labels = {};
        this.prevLabel = '';
        this.lastLabel = '';
    }

    resetFromJSON(o) {
        this.prevLabel = GetValue(o, 'preLabel', '');
        this.lastLabel = GetValue(o, 'lastLabel', '');
        var labels = GetValue(o, 'labels', undefined);
        if (labels === undefined) {
            Clear(this.labels);
        } else {
            Clone(labels, this.labels);
        }
    }

    toJSON() {
        return {
            preLabel: this.prevLabel,
            lastLabel: this.lastLabel,
            labels: this.labels
        };
    }

    parse(inst, index) {
        inst.length = 2;
        var label = this.getLabel(inst);
        this.addLabel(label, index);
        return inst;
    }

    run(inst) {
        var label = this.getLabel(inst);
        if (this.scenario.isDebugMode) {
            this.scenario.log('#LABEL: ' + label);
        }

        this.prevLabel = this.lastLabel;
        this.lastLabel = label;
        //this.scenario.resetClock(); // TODO
        var scenario = this.scenario;
        scenario.emit('labelchange', this.lastLabel, this.prevLabel, scenario.scope, scenario);
    }

    getLabel(inst) {
        var label = inst[1];
        if (label == null) {
            label = '';
            inst[1] = label;
        }
        return label;
    }

    addLabel(name, index) {
        this.labels[name] = index;
    }

    getIndex(name) {
        if ((name === '') || !this.hasLabel(name)) {
            return 0;
        }
        return this.labels[name];
    }

    hasLabel(name) {
        return this.labels.hasOwnProperty(name);
    }
}

export default LabelCmd;