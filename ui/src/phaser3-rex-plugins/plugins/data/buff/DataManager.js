import methods from './Methods.js';
import Extend from './Extend.js';

const Base = Phaser.Data.DataManager;
const EventEmitterKlass = Phaser.Events.EventEmitter;

class DataManager extends Base {
    constructor(parent, eventEmitter) {
        var useDefaultEventEmitter = (eventEmitter === undefined);
        if (useDefaultEventEmitter) {
            eventEmitter = new EventEmitterKlass();
        }

        super(parent, eventEmitter);

        if (useDefaultEventEmitter) {
            var parentEventEmitter = (parent.events) ? parent.events : parent;
            if (parentEventEmitter) {
                parentEventEmitter.once('destroy', this.destroy, this);
            }
        }

        Extend(this);
    }
}

Object.assign(
    DataManager.prototype,
    methods
);

export default DataManager;