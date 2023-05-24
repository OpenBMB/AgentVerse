import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var WaitKeyDown = function (tagPlayer, keyName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope, 'keydown');

    var eventName = `keydown-${keyName.toUpperCase()}`;
    var keyboard = tagPlayer.scene.input.keyboard;

    // Remove all wait events
    tagPlayer.once(RemoveWaitEvents, function () {
        keyboard.off(eventName, wrapCallback, tagPlayer);
    });

    keyboard.once(eventName, wrapCallback, tagPlayer);

    tagPlayer.emit('wait.keydown', keyName);
}

export default WaitKeyDown;