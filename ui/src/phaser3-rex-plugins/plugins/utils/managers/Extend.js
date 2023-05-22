import InitManagers from './InitManagers.js';
import SetTimeScale from './SetTimeScale.js';
import GetTimeScale from './GetTimeScale.js';
import DestroyManagers from './DestroyManagers.js';
import GameObjectManagerMethods from './GameObjectManagerMethods.js';
import GameObjectMethods from './GameObjectMethods.js';

var Extend = function (BaseClass) {
    class Managers extends BaseClass { }

    var Methods = {
        initManagers: InitManagers,
        setTimeScale: SetTimeScale,
        getTimeScale: GetTimeScale,
        destroyManagers: DestroyManagers,
    }

    Object.assign(
        Managers.prototype,
        Methods,
        GameObjectManagerMethods,
        GameObjectMethods,
    )

    return Managers;
}

export default Extend;