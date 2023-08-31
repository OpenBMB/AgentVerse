import LoaderCallback from './parse/utils/preload/LoaderCallback.js';
import ObjectFactory from './parse/ObjectFactory.js';
import PageLoaderFactory from './parse/pageloader/Factory.js'
import ItemTableFactory from './parse/itemtable/Factory.js';
import LeaderBoardFactory from './parse/leaderboard/Factory.js';
import QuickLogin from './parse/quicklogin/QuickLogin.js';

class ParsePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        this.add = new ObjectFactory();
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    preload(scene, url) {
        LoaderCallback.call(scene.sys.load, url);
        return this;
    }
}

var methods = {
    quickLogin: QuickLogin
}
Object.assign(
    ParsePlugin.prototype,
    methods
);

export default ParsePlugin;
