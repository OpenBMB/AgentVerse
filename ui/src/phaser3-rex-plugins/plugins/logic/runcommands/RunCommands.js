import GetValue from '../../utils/object/GetValue.js';
import ArrayCopy from '../../utils/array/Copy.js';
import TypeConvert from '../../utils/string/TypeConvert.js';
import IsArray from '../../utils/object/IsArray.js';

var RunCommands = function (queue, scope, config) {
    var reverse = GetValue(config, 'reverse', false);

    var retVal;
    if (IsArray(queue[0])) {
        if (!reverse) {
            for (var i = 0, len = queue.length; i < len; i++) {
                retVal = RunCommands(queue[i], scope, config);
            }
        } else {
            for (var len = queue.length, i = len - 1; i >= 0; i--) {
                retVal = RunCommands(queue[i], scope, config);
            }
        }
    } else {
        retVal = RunCommand(queue, scope, config);
    }

    return retVal;
}

var RunCommand = function (cmd, scope, config) {
    var argsConvert = GetValue(config, 'argsConvert', undefined);
    var argsConvertScope = GetValue(config, 'argsConvertScope', undefined);

    var fnName = cmd[0];

    ARGS = ArrayCopy(ARGS, cmd, 1);
    if (argsConvert) {
        // convert string to floating number, boolean, null, or string        
        if (argsConvert === true) {
            argsConvert = TypeConvert;
            argsConvertScope = undefined;
        }
        for (var i = 0, len = ARGS.length; i < len; i++) {
            if (argsConvertScope) {
                ARGS[i] = argsConvert.call(argsConvertScope, ARGS[i], cmd);
            } else {
                ARGS[i] = argsConvert(ARGS[i], cmd);
            }
        }
    }

    var fn;
    if (typeof (fnName) === 'string') {
        fn = scope[fnName];
        if (fn == null) {
            fn = GetValue(scope, fnName, null);
        }
    } else {
        fn = fnName;
    }

    var retValue = fn.apply(scope, ARGS);
    return retValue;
}
var ARGS = []; // reuse this array

export default RunCommands;