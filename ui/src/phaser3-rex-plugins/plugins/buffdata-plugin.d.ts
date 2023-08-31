import DataManager from './buffdata';
import Extend from './data/buff/Extend';

export default class DataManagerPlugin extends Phaser.Plugins.BasePlugin {
    add(
        parent: object,
        eventEmitter?: Phaser.Events.EventEmitter,
    ): DataManager;

    extend: typeof Extend
}