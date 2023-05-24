import { RemoveWaitEvents } from '../Events.js';

var GetWrapCallback = function (textPlayer, callback, args, scope, removeFrom) {
    return function () {
        textPlayer.emit(RemoveWaitEvents, removeFrom); // Remove all wait events
        callback.apply(scope, args);
    }
}
export default GetWrapCallback;