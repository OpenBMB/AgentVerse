import CreateBinaryFile from './CreateBinaryFile.js';
import { CubismModelSettingJson } from '../../framework/src/cubismmodelsettingjson';
import LoadChildrenFiles from './LoadChildrenFiles.js';
import SetValue from '../../../../utils/object/SetValue.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class Live2dFile extends Phaser.Loader.MultiFile {
    constructor(loader, key, url, xhrSettings) {
        if (IsPlainObject(key)) {
            var config = key;

            key = GetFastValue(config, 'key');
            url = GetFastValue(config, 'url');
            xhrSettings = GetFastValue(config, 'xhrSettings');
        }

        var cache = loader.cacheManager.custom.live2d;

        // Load setting
        var settingFile = CreateBinaryFile(loader, key, url, xhrSettings, 'setting');
        super(loader, 'live2d', key, [settingFile]);

        this.cache = cache;
        this.homeDir = url.substring(0, url.lastIndexOf('/') + 1);
    }

    onFileComplete(file) {        
        var index = this.files.indexOf(file);
        if (index === -1) {
            return;
        }

        // console.log(`Load file '${file.key}' at '${file.url}'`)

        this.pending--;

        if (index === 0) {
            var arrayBuffer = file.data;
            var setting = new CubismModelSettingJson(arrayBuffer, arrayBuffer.byteLength);
            file.data = setting;

            // Load remainder files by setting
            LoadChildrenFiles(this, setting);
        }
    }

    addToCache() {
        if (this.isReadyToProcess()) {
            var textureManager = this.loader.textureManager;
            var data = { key: this.key };
            for (var i = 0, cnt = this.files.length; i < cnt; i++) {
                var file = this.files[i];

                var fileData = file.data;
                // Process textures
                if (file.dataKey.startsWith('textures')) {
                    var key = file.key.replace(`${this.key}!`, '');
                    var texture;
                    // Add image to textureManager manually
                    if (!textureManager.exists(key)) {
                        texture = textureManager.addImage(key, file.data);
                    } else {
                        texture = textureManager.get(key);
                    }

                    // Store glTexture to live2d data cache
                    fileData = texture.source[0].glTexture;
                }

                SetValue(data, file.dataKey, fileData, '!!!');

                file.pendingDestroy();
            }

            this.cache.add(this.key, data);

            this.complete = true;
        }
    }
}

export default Live2dFile;