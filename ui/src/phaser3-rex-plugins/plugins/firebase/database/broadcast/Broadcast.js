import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import IsPlainObject from '../../../utils/object/IsPlainObject.js';
import Send from './Send.js';
import ReceiveMethods from './ReceiveMethods.js';
import History from './History.js';

class Broadcast {
    constructor(config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);
        this.eventNameMap = GetValue(config, 'eventNames', DefaultEventNames);

        this.database = firebase.database();
        this.setRootPath(GetValue(config, 'root', ''));

        // Sender
        this.skipFirst = true;
        this.stamp = false;
        this.userInfo = { userID: '', userName: undefined };
        this.setSender(GetValue(config, 'senderID', ''), GetValue(config, 'senderName', ''));
        this.setReceiver(GetValue(config, 'receiverID', ''));

        // Receiver
        this.isReceiving = false;

        // History messages
        var historyMaxLength = GetValue(config, 'history', 0);
        if (historyMaxLength === true) {
            historyMaxLength = -1;
        } else if (historyMaxLength === false) {
            historyMaxLength = 0;
        }
        this.history = new History({
            maxLength: historyMaxLength
        });

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
        this.rootPath = rootPath;
        this.sendToRef = undefined;
        this.receiverRef = undefined;
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
        this.receiverID = receiverID;
        return this;
    }

    changeUserName(userID, userName) {
        if (userID === this.userID) {
            this.userName = userName;
        }
        this.history.changeUserName(userID, userName);
        return this;
    }

    getHistory() {
        return this.history.records;
    }

    clearHistory() {
        this.history.clear();
        return this;
    }
}

var methods = {
    send: Send
}
Object.assign(
    Broadcast.prototype,
    EventEmitterMethods,
    ReceiveMethods,
    methods
);

const DefaultEventNames = {
    receive: 'receive'
}


export default Broadcast;