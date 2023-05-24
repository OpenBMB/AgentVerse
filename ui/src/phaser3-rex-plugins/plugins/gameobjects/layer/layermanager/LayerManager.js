import GOManager from '../../../utils/gameobject/gomanager/GOManager.js';
import SortGameObjectsByDepth from '../../../utils/system/SortGameObjectsByDepth.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class LayerManager extends GOManager {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        } else if (Array.isArray(config)) {
            config = {
                layers: config
            }
        }

        if (!config.hasOwnProperty('fade')) {
            config.fade = 0;
        }

        config.viewportCoordinate = false;

        super(scene, config);

        var initLayers = GetValue(config, 'layers');
        if (initLayers) {
            for (var i = 0, cnt = initLayers.length; i < cnt; i++) {
                this.add(initLayers[i]);
            }
        }
    }

    setCreateGameObjectCallback(callback, scope) {
        if (!callback) {
            callback = CreateLayer;
        }
        super.setCreateGameObjectCallback(callback, scope);
        return this;
    }

    // Override
    addGO(name, gameObject) {
        super.addGO(name, gameObject);
        gameObject.name = name;

        return this;
    }

    // New methods
    getLayer(name) {
        return this.getGO(name);
    }

    getLayers(out) {
        if (out === undefined) {
            out = [];
        }
        this.forEachGO(function (gameObject) {
            out.push(gameObject);
        })
        SortGameObjectsByDepth(out, false);
        return out;
    }

    addToLayer(name, gameObject) {
        var layer = this.getGO(name);
        if (!layer) {
            console.warn(`Can't get layer "${name}"`);
            return;
        }

        if (gameObject.isRexContainerLite) {
            gameObject.addToLayer(layer);
        } else {
            layer.add(gameObject);
        }

        return this;
    }
}

var CreateLayer = function (scene, depth) {
    var layer = scene.add.layer();
    if (depth !== undefined) {
        layer.setDepth(depth);
    }
    return layer;
}


export default LayerManager;