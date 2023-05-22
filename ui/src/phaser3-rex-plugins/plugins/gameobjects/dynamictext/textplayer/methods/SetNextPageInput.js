import GetWrapCallback from './utils/wait/GetWrapCallback.js';
import WaitMultiple from './utils/wait/WaitMultiple.js';

var SetNextPageInput = function (input) {
    var textPlayer = this;
    if (!input) {
        this.nextPageInput = null;

    } else if (typeof (input) === 'function') {
        this.nextPageInput = function (callback, args, scope) {
            var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope);
            input.call(textPlayer, wrapCallback);
        }

    } else {
        this.nextPageInput = function (callback, args, scope) {
            WaitMultiple(textPlayer, input, callback, args, scope);
        }
    }
}

export default SetNextPageInput;