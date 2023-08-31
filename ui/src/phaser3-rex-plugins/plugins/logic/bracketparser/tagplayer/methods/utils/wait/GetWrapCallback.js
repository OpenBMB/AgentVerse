import { RemoveWaitEvents } from '../Events.js';

var GetWrapCallback = function (tagPlayer, callback, args, scope, removeFrom) {
    return function () {
        tagPlayer.emit(RemoveWaitEvents, removeFrom); // Remove all wait events
        callback.apply(scope, args);
    }
}
export default GetWrapCallback;