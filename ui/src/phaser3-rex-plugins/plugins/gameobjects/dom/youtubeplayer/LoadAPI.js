import LoadScript from '../../../utils/loader/LoadScript.js';

var IsAPIReady = false;
var LoadAPI = function (onLoaded) {
    if (IsAPIReady) {
        onLoaded();
    } else {
        if (!window.onYouTubeIframeAPIReady) {
            window.onYouTubeIframeAPIReady = function () {
                IsAPIReady = true;
                for(var i=0, cnt = CallbackQueue.length; i<cnt; i++) {
                    CallbackQueue[i]();
                }
                CallbackQueue = undefined;
            };
            LoadScript('https://www.youtube.com/iframe_api');
            // Function onYouTubeIframeAPIReady() should be defined before loading 
        }
        CallbackQueue.push(onLoaded);
    }
}
var CallbackQueue = [];

export default LoadAPI;