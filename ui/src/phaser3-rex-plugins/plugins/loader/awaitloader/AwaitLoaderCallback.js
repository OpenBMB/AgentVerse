import AwaitFile from './AwaitFile.js';
import IsFunction from '../../utils/object/IsFunction.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

const loaderCallback = function (key, config) {
    if (IsFunction(key)) {
        var callback = key;
        var scope = config;
        config = {
            config: {
                callback: callback,
                scope: scope,
            }
        };
    } else if (IsPlainObject(key)) {
        config = key;
        if (!config.hasOwnProperty('config')) {
            config = {
                config: config
            };
        }
    } else {
        config = {
            key: key,
            config: config
        };
    }
    this.addFile(new AwaitFile(this, config));

    return this;
}

export default loaderCallback;