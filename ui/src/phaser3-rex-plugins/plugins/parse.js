import ObjectFactory from './parse/ObjectFactory.js';
import Preload from './parse/utils/preload/Preload.js';
import PageLoaderFactory from './parse/pageloader/Factory.js'
import ItemTableFactory from './parse/itemtable/Factory.js';
import LeaderBoardFactory from './parse/leaderboard/Factory.js';
import QuickLogin from './parse/quicklogin/QuickLogin.js';

class ParsePlugin {
    constructor() {
        this.add = new ObjectFactory();
    }

    preload(url) {
        return Preload(url);
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
