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

var WaitCameraEffect = function (tagPlayer, effectName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope, `camera.${effectName}`);

    var camera = tagPlayer.targetCamera;

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
        tagPlayer.emit('wait.camera', effectName);
        wrapCallback();

    } else {
        // Remove all wait events
        tagPlayer.once(RemoveWaitEvents, function (removeFrom) {
            camera.off(completeEventName, wrapCallback, tagPlayer);
        });
        camera.once(completeEventName, wrapCallback, tagPlayer);
        tagPlayer.emit('wait.camera', effectName);
    }

}

export { IsWaitCameraEffect, WaitCameraEffect };