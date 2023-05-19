import Preload from './firebase/preload/Preload.js';
import ObjectFactory from './firebase/ObjectFactory.js'

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

class FirebasePlugin {
    constructor() {
        this.add = new ObjectFactory();
    }

    initializeApp(config) {
        this.add.initializeApp(config);
        return this;
    }

    preload(urlConfig, firebaseConfig) {
        return Preload(urlConfig, firebaseConfig);
    }
}


export default FirebasePlugin;
