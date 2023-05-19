import ObjectFactory from './graph/ObjectFactory.js';

import GraphFactory from './graph/graph/Factory.js';

class GraphPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }        
}

export default GraphPlugin;
