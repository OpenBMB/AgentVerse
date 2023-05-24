import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var WaitKeyDown = function (textPlayer, keyName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope, 'keydown');

    var eventName = `keydown-${keyName.toUpperCase()}`;
    var keyboard = textPlayer.scene.input.keyboard;

    // Remove all wait events
    textPlayer.once(RemoveWaitEvents, function () {
        keyboard.off(eventName, wrapCallback, textPlayer);
    });

    keyboard.once(eventName, wrapCallback, textPlayer);

    textPlayer.emit('wait.keydown', keyName);
}

export default WaitKeyDown;