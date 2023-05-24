import RunVerticalWrapBase from './wrap/runverticalwrap/RunVerticalWrap.js';

const Merge = Phaser.Utils.Objects.Merge;

var RunVerticalWrap = function (config) {
    if (config === undefined) {
        config = {};
    }

    return RunVerticalWrapBase.call(this, Merge(config, this.wrapConfig));
};

export default RunVerticalWrap;