import GetWrapCallback from './GetWrapCallback.js';

var WaitCallback = function (tagPlayer, postfixName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope, 'custom');

    var eventName = (postfixName) ? `wait.${postfixName}` : 'wait';
    tagPlayer.emit(eventName, wrapCallback);
}

export default WaitCallback;
