import GetValue from '../../../utils/object/GetValue.js';
import Shuffle from '../../../utils/array/Shuffle.js';

var JoinRandomRoom = function (config) {
    if (config === undefined) {
        config = {};
    }

    var roomType = GetValue(config, 'roomType', '');
    var roomState = GetValue(config, 'door', 'open');
    var self = this;
    return this.getRoomList(roomType, roomState)
        .then(function (rooms) {
            Shuffle(rooms);
            return JoinNextRoom.call(self, config, rooms, 0);
        })
}

var JoinNextRoom = function (config, rooms, index) {
    if (index === rooms.length) {
        return Promise.reject();
    }
    config.roomID = rooms[index].roomID;
    index++;
    var self = this;
    return this.joinRoom(config)
        .catch(function () {
            return JoinNextRoom.call(self, config, rooms, index);
        })
}

export default JoinRandomRoom;
