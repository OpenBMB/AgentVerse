import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import IsPlainObject from '../../../utils/object/IsPlainObject.js';
import ItemList from '../utils/itemlist/ItemList.js';
import Join from './Join.js';
import Leave from './Leave.js';
import ChangeUserName from './ChangeUserName.js';

class OnlineUserList {
    constructor(config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = firebase.database();
        this.setRootPath(GetValue(config, 'root', ''));

        this.userInfo = { userID: '', userName: '' };
        this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', ''));
        this.setMaxUsers(GetValue(config, 'maxUsers', 0));
        this.userList = new ItemList({
            eventEmitter: this.getEventEmitter(),
            itemIDKey: 'joinAt',
            eventNames: {
                add: GetValue(config, 'eventNames.join', 'join'),
                remove: GetValue(config, 'eventNames.leave', 'leave'),
                update: GetValue(config, 'eventNames.update', 'update'),
                change: GetValue(config, 'eventNames.change', 'change'),
                init: GetValue(config, 'eventNames.init', 'init'),
                changename: GetValue(config, 'eventNames.changename', 'changename')
            }
        });

        this.isInList = false;
        this.userID2ItemID = {};
        this.userList
            .on(this.userList.eventNames.add, function (user) {
                this.userID2ItemID[user.userID] = user.joinAt;
                if (user.userID === this.userInfo.userID) {
                    this.emit(this.userList.eventNames.init, this.getUsers());
                }
            }, this)
            .on(this.userList.eventNames.remove, function (user) {
                delete this.userID2ItemID[user.userID];

                if (user.userID === this.userID) {
                    this.isInList = false;
                }
            }, this)
            .on(this.userList.eventNames.change, function (currUserInfo, prevUserInfo) {
                var userID = currUserInfo.userID,
                    userName = currUserInfo.userName,
                    prevUserName = prevUserInfo.userName;
                if (userName !== prevUserName) {
                    this.emit(this.userList.eventNames.changename, userID, userName, prevUserName);
                }
            }, this)
    }

    shutdown() {
        this
            .stopUpdate()
            .destroyEventEmitter()
            .leave();

        this.userList.shutdown();
    }

    destroy() {
        this.shutdown();
    }

    get userID() {
        return this.userInfo.userID;
    }

    set userID(value) {
        this.userInfo.userID = value;
    }

    get userName() {
        return this.userInfo.userName;
    }

    set userName(value) {
        this.userInfo.userName = value;
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
        return this;
    }

    get rootRef() {
        return this.database.ref(this.rootPath);
    }

    setUser(userID, userName) {
        if (IsPlainObject(userID)) {
            this.userInfo = userID;
        } else {
            this.userID = userID;
            this.userName = userName;
        }
        return this;
    }

    setMaxUsers(maxUsers) {
        this.maxUsers = maxUsers;
        return this;
    }

    clear() {
        this.userList.clear();
        return this;
    }

    forEach(callback, scope) {
        this.userList.forEach(callback, scope);
        return this;
    }

    isFull() {
        if (this.maxUsers === 0) {
            return false;
        }
        return (this.userList.getItems().length >= this.maxUsers);
    }

    isFirstUser(userID) {
        if (userID === undefined) {
            userID = this.userID;
        }
        var user = this.usersList.getItems()[0];
        return (user && (user.userID === userID));
    }

    getUser(userID) {
        if (userID === undefined) {
            userID = this.userID;
        }
        if (!this.contains(userID)) {
            return null;
        }
        var itemID = this.userID2ItemID[userID];
        return this.userList.getItemFromItemID(itemID);
    }

    getUsers() {
        return this.userList.getItems();
    }

    get rootRef() {
        return this.database.ref(this.rootPath);
    }

    getUserRef(userID) {
        if (userID === undefined) {
            userID = this.userID;
        }
        if (!this.contains(userID)) {
            return null;
        }
        var itemID = this.userID2ItemID[userID];
        return this.rootRef.child(itemID);
    }

    contains(userID) {
        if (userID === undefined) {
            userID = this.userID;
        }
        return this.userID2ItemID.hasOwnProperty(userID);
    }

    startUpdate() {
        var query = this.database.ref(this.rootPath);
        if (this.maxUsers > 0) {
            query = query.limitToFirst(this.maxUsers);
        }
        this.userList.startUpdate(query);
        return this;
    }

    stopUpdate() {
        this.userList.stopUpdate();
        return this;
    }
}

var methods = {
    join: Join,
    leave: Leave,
    changeUserName: ChangeUserName
}

Object.assign(
    OnlineUserList.prototype,
    EventEmitterMethods,
    methods
);

export default OnlineUserList;