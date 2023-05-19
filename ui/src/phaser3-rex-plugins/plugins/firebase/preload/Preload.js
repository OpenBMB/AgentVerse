import GetDefaultUrl from './GetDefaultUrl.js';
import MergeRight from '../../utils/object/MergeRight.js';
import LoadScriptPromise from '../../utils/loader/LoadScriptPromise.js';
import AvailableTest from './AvailableTest.js';

var Preload = function (urlConfig, firebaseConfig) {
    if (typeof (urlConfig) === 'string') {  // Get specific version
        urlConfig = GetDefaultUrl(urlConfig);
    } else { // Get default version
        urlConfig = MergeRight(GetDefaultUrl(), urlConfig);
    }

    return LoadScriptPromise(urlConfig.app)  // Load firebase-app
        .then(function () { // Load other SDK
            var promises = [];
            var url;
            for (var k in urlConfig) {
                if (k === 'app') {
                    continue;
                }
                url = urlConfig[k];
                if (!url) {
                    continue;
                }
                promises.push(LoadScriptPromise(url))
            }

            if (promises.length === 0) {
                return Promise.resolve();
            } else {
                return Promise.all(promises);
            }
        })
        .then(function () { // Wait until all vairalbe are available
            return AvailableTest(urlConfig);
        })
        .then(function () {
            if (firebaseConfig !== undefined) {
                firebase.initializeApp(firebaseConfig);
            }
            return Promise.resolve();
        })
}

export default Preload;