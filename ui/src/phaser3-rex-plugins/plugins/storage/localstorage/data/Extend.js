import StorageMethods from './StorageMethods.js';
import Load from './Load.js';
import GetDefaultValue from './GetDefaultValue.js';
import AddCallbacks from './AddCallbacks.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const SetStruct = Phaser.Structs.Set;


var methods = {
    load: Load,
    getDefaultValue: GetDefaultValue,
}

var Extend = function (dataManager, config) {
    if (dataManager.hasOwnProperty('_syncEnable')) {
        // Already extended
        return dataManager;
    }

    dataManager._syncEnable = true;
    dataManager.dataKeys = new SetStruct();
    dataManager.defaultData = undefined;

    Object.assign(
        dataManager,
        StorageMethods,
        methods
    );

    AddCallbacks(dataManager);

    dataManager.name = GetValue(config, 'name', '');

    var load = GetValue(config, 'load', true);
    if (load) {
        var defaultData = GetValue(config, 'default', undefined);
        var resetFlag = GetValue(config, 'reset', false);
        dataManager.load(defaultData, resetFlag);
    }

    return dataManager;
}

export default Extend