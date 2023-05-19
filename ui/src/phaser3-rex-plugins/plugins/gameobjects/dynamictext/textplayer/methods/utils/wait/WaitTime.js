import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var WaitTime = function (textPlayer, time, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope, 'time');

    var timer;

    // Remove all wait events
    textPlayer.once(RemoveWaitEvents, function () {
        if (timer) {
            timer.remove();
            timer = undefined;
        }
    });

    timer = textPlayer.timeline.delayCall(time, wrapCallback);

    textPlayer.emit('wait.time', time);
}

export default WaitTime;