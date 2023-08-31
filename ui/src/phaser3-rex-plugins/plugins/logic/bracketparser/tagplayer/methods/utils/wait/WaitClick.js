import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var WaitClick = function (tagPlayer, callback, args, scope) {
    var clickEE = tagPlayer.clickEE;

    if (!clickEE) {
        return;
    }

    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope, 'click');

    // Remove all wait events
    tagPlayer.once(RemoveWaitEvents, function () {
        clickEE.off('pointerdown', wrapCallback, tagPlayer);
    });

    clickEE.once('pointerdown', wrapCallback, tagPlayer);

    tagPlayer.emit('wait.click');
}

export default WaitClick;