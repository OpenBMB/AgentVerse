import LoadScript from './LoadScript.js';

var LoadScriptPromise = function (url) {
    return new Promise(function (resolve, reject) {
        LoadScript(url, resolve);
    });
};

export default LoadScriptPromise;