const BinaryFile = Phaser.Loader.FileTypes.BinaryFile;

var CreateBinaryFile = function (loader, key, url, xhrSettings, dataKey) {
    var file = new BinaryFile(loader, key, url, xhrSettings);
    file.dataKey = dataKey;  // Store data by dataKey into live2d cache later
    file.cache = false;      // Don't store data into binary cache
    return file;
}

export default CreateBinaryFile;