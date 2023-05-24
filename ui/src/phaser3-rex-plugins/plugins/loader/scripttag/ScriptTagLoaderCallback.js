import AwaitFile from '../awaitloader/AwaitFile.js';
import LoadScriptPromise from '../../utils/loader/LoadScriptPromise.js';
import Delay from '../../utils/promise/Delay.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetFastValue = Phaser.Utils.Objects.GetFastValue;

const LoaderCallback = function (url) {
    if (Array.isArray(url)) {
        for (var i = 0, cnt = url.length; i < cnt; i++) {
            this.addFile(CreateAwiatFile(this, url[i]));
        }
    } else {
        this.addFile(CreateAwiatFile(this, url));
    }
    return this;
}

var CreateAwiatFile = function (loader, url, availableTest) {
    if (IsPlainObject(url)) {
        var config = url;
        url = GetFastValue(config, 'url');
        availableTest = GetFastValue(config, 'availableTest');
    }

    var callback = function (successCallback, failureCallback) {

        LoadScriptPromise(url)
            .then(function () {
                if (!availableTest) {
                    return Promise.resolve();
                }

                var AvailableTestPromise = function () {
                    if (availableTest()) {
                        return Promise.resolve();
                    }

                    return Delay(10)
                        .then(function () {
                            return AvailableTestPromise();
                        });
                }
                return AvailableTestPromise();
            })
            .then(function () {
                successCallback()
            })
    }

    return new AwaitFile(loader, {
        type: 'scriptTag',
        config: { callback: callback }
    });
}

export default LoaderCallback;