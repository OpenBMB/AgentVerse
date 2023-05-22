import Broadcast from '../../broadcast/Broadcast.js';
import GetValue from '../../../../utils/object/GetValue.js';

var CreateBroadcast = function (config) {
    var broadcastConfig = GetValue(config, 'broadcast', true);
    if (!broadcastConfig) {
        return null;
    }

    var broadcast = new Broadcast({
        eventEmitter: this.getEventEmitter(),
        eventNames: {
            receive: 'broadcast.receive'
        },

        root: this.rootPath,
        receiverID: 'broadcast',
        senderID: this.userInfo,
        history: GetValue(broadcastConfig, 'history', false)
    });

    this
        .on('room.join', function () {
            broadcast.startReceiving()
        })
        .on('room.leave', function () {
            broadcast.stopReceiving()
        })
        .on('userlist.changename', function (userID, userName) {
            broadcast.changeUserName(userID, userName);
        }, this)

    return broadcast;
}

export default CreateBroadcast;