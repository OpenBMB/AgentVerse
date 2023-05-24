import FileObjectToCache from '../../../utils/loader/FileObjectToCache';

var LoadFile = function (file, loaderType, key, cacheType, onComplete) {
    var scene = this.scene;
    FileObjectToCache(scene, file, loaderType, key, cacheType, onComplete);

    return this;
}

var LoadFilePromise = function (file, loaderType, key, cacheType) {
    var scene = this.scene;
    return new Promise(function (resolve, reject) {
        var onComplete = function (data) {
            resolve(data)
        }
        FileObjectToCache(scene, file, loaderType, key, cacheType, onComplete);
    });
}

export default {
    loadFile: LoadFile,
    loadFilePromise: LoadFilePromise,
}