import GetCache from '../system/GetCache.js';
import IsFunction from '../object/IsFunction.js';

var FileObjectToCache = function (scene, file, loaderType, key, cacheType, onComplete) {
    // Remove data from cache
    if ((cacheType === null) || (cacheType === false)) {

    } else if (IsFunction(cacheType)) {
        cacheType();
    } else {
        var cache = GetCache(scene, loaderType, cacheType);
        if (cache.exists(key)) {
            cache.remove(key);
        }
    }

    // Add filecomplete event
    var loader = scene.load;
    if (onComplete) {
        loader.once(`filecomplete-${loaderType}-${key}`, function (key, type, data) {
            onComplete(data);
        })
    }

    // Load file from url
    if (IsFunction(file)) {
        file();
    } else {
        var url = window.URL.createObjectURL(file);
        loader[loaderType](key, url);
    }

    loader.start();
}

export default FileObjectToCache;