import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var IsWaitCameraEffect = function (name) {
    switch (name) {
        case 'camera.fadein':
        case 'camera.fadeout':
        case 'camera.flash':
        case 'camera.shake':
        case 'camera.zoom':
        case 'camera.rotate':
        case 'camera.scroll':
            return true;
        default:
            return false;
    }
}

var WaitCameraEffect = function (textPlayer, effectName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope, `camera.${effectName}`);

    var camera = textPlayer.targetCamera;

    var effect, completeEventName;
    switch (effectName) {
        case 'camera.fadein':
            effect = camera.fadeEffect;
            completeEventName = 'camerafadeincomplete';
            break;

        case 'camera.fadeout':
            effect = camera.fadeEffect;
            completeEventName = 'camerafadeoutcomplete';
            break;

        case 'camera.flash':
            effect = camera.flashEffect;
            completeEventName = 'cameraflashcomplete';
            break;

        case 'camera.shake':
            effect = camera.shakeEffect;
            completeEventName = 'camerashakecomplete';
            break;

        case 'camera.zoom':
            effect = camera.zoomEffect;
            completeEventName = 'camerazoomcomplete';
            break;

        case 'camera.rotate':
            effect = camera.rotateToEffect;
            completeEventName = 'camerarotatecomplete';
            break;

        case 'camera.scroll':
            effect = camera.panEffect;
            completeEventName = 'camerapancomplete';
            break;
    }

    if (!effect.isRunning) {
        textPlayer.emit('wait.camera', effectName);
        wrapCallback();

    } else {
        // Remove all wait events
        textPlayer.once(RemoveWaitEvents, function (removeFrom) {
            camera.off(completeEventName, wrapCallback, textPlayer);
        });
        camera.once(completeEventName, wrapCallback, textPlayer);
        textPlayer.emit('wait.camera', effectName);
    }

}

export { IsWaitCameraEffect, WaitCameraEffect };