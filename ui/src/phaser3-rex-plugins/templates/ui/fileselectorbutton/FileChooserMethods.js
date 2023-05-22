export default {
    setAccept(accept) {
        this.childrenMap.fileChooser.setAccept(accept);
        return this;
    },

    setMultiple(enabled) {
        this.childrenMap.fileChooser.setMultiple(enabled);
        return this;
    },

    loadFile(file, loaderType, key, cacheType, onComplete) {
        this.childrenMap.fileChooser.loadFile(file, loaderType, key, cacheType, onComplete);
        return this;
    },

    loadFilePromise(file, loaderType, key, cacheType) {
        return this.childrenMap.fileChooser.loadFilePromise(file, loaderType, key, cacheType);
    }

}