import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import IsPlainObject from '../../../utils/object/IsPlainObject.js';
import Send from './Send.js';
import ReceiveMethods from './ReceiveMethods.js';
import GetQueryMethods from './GetQueryMethods.js';
import PageLoader from '../pageloader/PageLoader.js';

class Messages {
    constructor(config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = firebase.firestore();
        this.setRootPath(GetValue(config, 'root', ''));

        this.userInfo = { userID: '', userName: undefined };
        this.setSender(GetValue(config, 'senderID', ''), GetValue(config, 'senderName', ''));
        this.setReceiver(GetValue(config, 'receiverID', undefined));

        this.skipFirst = true;
        this.unsubscribe = undefined;
        this.page = new PageLoader();
        this.setPageItemCount(GetValue(config, 'pageItemCount', 100));
        this.resetQueryFlag = true;
        this.cacheMessages = [];
    }

    shutdown() {
        this
            .stopReceiving()
            .destroyEventEmitter();
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
        this.resetQueryFlag |= (this.rootPath !== rootPath);
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
    }

    setSender(userID, userName) {
        if (IsPlainObject(userID)) {
            this.userInfo = userID;
        } else {
            this.userID = userID;
            this.userName = userName;
        }
        return this;
    }

    setReceiver(receiverID) {
        this.resetQueryFlag |= (this.receiverID !== receiverID);
        this.receiverID = receiverID;
        return this;
    }

    setPageItemCount(count) {
        this.page.setItemCount(count);
        return this;
    }

    get hasPreviousMessage() {
        return (this.page.isFullPage !== false);
    }
}

var methods = {
    send: Send
}

Object.assign(
    Messages.prototype,
    EventEmitterMethods,
    methods,
    ReceiveMethods,
    GetQueryMethods
);

export default Messages;