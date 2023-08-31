import { EaseMove, EaseMoveTo, EaseMoveToDestroy, EaseMoveFrom, EaseMoveFromDestroy } from './easemove.js';

class EaseMovePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new EaseMove(gameObject, config);
    }
}

// mixin
var methods = {
    moveTo: EaseMoveTo,
    moveFrom: EaseMoveFrom,
    moveToDestroy: EaseMoveToDestroy,
    moveFromDestroy: EaseMoveFromDestroy
}
Object.assign(
    EaseMovePlugin.prototype,
    methods
);

export default EaseMovePlugin;