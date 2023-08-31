import RunWordWrapBase from './wrap/runwordwrap/RunWordWrap.js';

const Merge = Phaser.Utils.Objects.Merge;

var RunWordWrap = function (config) {
    if (config === undefined) {
        config = {};
    }

    return RunWordWrapBase.call(this, Merge(config, this.wrapConfig));
};

export default RunWordWrap;