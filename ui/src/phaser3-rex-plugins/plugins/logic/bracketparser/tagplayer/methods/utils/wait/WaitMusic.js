import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var WaitMusic = function (tagPlayer, music, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope, 'music');

    if (music) {
        // Remove all wait events
        tagPlayer.once(RemoveWaitEvents, function () {
            music.off('complete', wrapCallback, tagPlayer);
        });

        music.once('complete', wrapCallback, tagPlayer);
    }

    tagPlayer.emit('wait.music', music);

    if (!music) {
        wrapCallback();
    }
}

export default WaitMusic;