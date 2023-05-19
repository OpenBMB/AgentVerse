import Preload from './Preload.js';
import AwaitFile from '../../loader/awaitloader/AwaitFile.js';

const LoaderCallback = function (urlConfig, firebaseConfig) {
    var callback = function (successCallback, failureCallback) {
        return Preload(urlConfig, firebaseConfig)
            .then(function () {
                setTimeout(successCallback, 0);
            })
            .catch(failureCallback)
    }

    this.addFile(new AwaitFile(this, {
        config: { callback: callback }
    }));
    return this;
}

export default LoaderCallback;