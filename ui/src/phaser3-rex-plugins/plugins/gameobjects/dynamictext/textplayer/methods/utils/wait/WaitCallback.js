import GetWrapCallback from './GetWrapCallback.js';

var WaitCallback = function (textPlayer, postfixName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope, 'custom');

    var eventName = (postfixName) ? `wait.${postfixName}` : 'wait';
    textPlayer.emit(eventName, wrapCallback);
}

export default WaitCallback;
