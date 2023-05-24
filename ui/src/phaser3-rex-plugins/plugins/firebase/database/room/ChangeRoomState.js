import { GetFilterString } from './utils/RoomFilterMethods.js';

var ChangeRoomState = function (roomID, roomState) {
    if (arguments.length === 1) {
        roomState = roomID;
        roomID = undefined;
    }
    if (roomID === undefined) {
        roomID = this.roomID;
    }

    var self = this;
    return this.hasRoom(roomID)
        .then(function (hasRoom) {
            if (!hasRoom) {
                return Promise.resolve();
            }

            var filter = GetFilterString(roomState, self.roomType);
            var d = {};
            d[`room-filters/${roomID}/filter`] = filter;
            d[`room-data/${roomID}/filter`] = filter;
            return self.getRootRef().update(d)
        })
}

var OpenRoom = function (roomID) {
    return this.setRoomState(roomID, 'open');
}

var CloseRoom = function (roomID) {
    return this.setRoomState(roomID, 'closed');
}

export {
    ChangeRoomState,
    OpenRoom,
    CloseRoom
};