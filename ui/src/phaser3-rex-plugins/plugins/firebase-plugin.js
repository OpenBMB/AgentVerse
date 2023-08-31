import LoaderCallback from './firebase/preload/LoaderCallback.js';
import ObjectFactory from './firebase/ObjectFactory.js';

import BroadcastFactory from './firebase/database/broadcast/Factory.js';
import OnlineUserListFactory from './firebase/database/onlineuserlist/Factory.js';
import RoomFactory from './firebase/database/room/Factory.js';
import SingleRoomFactory from './firebase/database/singleroom/Factory.js';
import ItemTableFactory from './firebase/database/itemtable/Factory.js';

import PageLoaderFactory from './firebase/firestore/pageloader/Factory.js';
import FilesFactory from './firebase/firestore/files/Factory.js';
import IdAliasFactory from './firebase/firestore/idalias/Factory.js';
import LeaderBoardFactory from './firebase/firestore/leaderboard/Factory.js';
import MessagesFactory from './firebase/firestore/messages/Factory.js';

class FirebasePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        this.add = new ObjectFactory();
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    initializeApp(config) {
        this.add.initializeApp(config);
        return this;
    }

    preload(scene, urlConfig, firebaseConfig) {
        LoaderCallback.call(scene.sys.load, urlConfig, firebaseConfig);
        return this;
    }
}


export default FirebasePlugin;
