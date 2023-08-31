import VisibleCallbacks from './VisibleCallbacks.js';
import FadeCallbacks from './FadeCallbacks.js';
import MoveCallbacks from './MoveCallbacks.js';
import MovePanelCallbacks from './MovePanelCallbacks.js';
import NOOP from '../../../../plugins/utils/object/NOOP.js';

const DefaultCallbacks = {
    visible: VisibleCallbacks,
    fade: FadeCallbacks,
    move: MoveCallbacks,
    'move-panel': MovePanelCallbacks
}

var GetDefaultCallbacks = function (config) {
    var callbackType, callbackParams;
    [callbackType, ...callbackParams] = (typeof (config) === 'string') ? [config] : config;

    var showCallback, hideCallback;
    if (DefaultCallbacks.hasOwnProperty(callbackType)) {
        showCallback = DefaultCallbacks[callbackType].show.apply(null, callbackParams);
        hideCallback = DefaultCallbacks[callbackType].hide.apply(null, callbackParams);
    } else {
        showCallback = NOOP;
        hideCallback = NOOP;
    }
    return {
        show: showCallback,
        hide: hideCallback
    }
}

export default GetDefaultCallbacks;