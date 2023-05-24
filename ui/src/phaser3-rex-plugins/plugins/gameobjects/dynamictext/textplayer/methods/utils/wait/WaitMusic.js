import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var WaitMusic = function (textPlayer, music, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope, 'music');

    if (music) {
        // Remove all wait events
        textPlayer.once(RemoveWaitEvents, function () {
            music.off('complete', wrapCallback, textPlayer);
        });

        music.once('complete', wrapCallback, textPlayer);
    }

    textPlayer.emit('wait.music', music);

    if (!music) {
        wrapCallback();
    }
}

export default WaitMusic;