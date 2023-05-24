import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var WaitClick = function (textPlayer, callback, args, scope) {
    var clickEE = textPlayer.clickEE;

    if (!clickEE) {
        return;
    }

    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope, 'click');

    // Remove all wait events
    textPlayer.once(RemoveWaitEvents, function () {
        clickEE.off('pointerdown', wrapCallback, textPlayer);
    });

    clickEE.once('pointerdown', wrapCallback, textPlayer);

    textPlayer.emit('wait.click');
}

export default WaitClick;