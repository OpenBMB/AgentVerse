var ChangeRoomName = function (roomID, roomName) {
    if (arguments.length === 1) {
        roomName = roomID;
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
            var d = {};
            d[`room-filters/${roomID}/name`] = roomName;
            d[`room-data/${roomID}/name`] = roomName;
            return self.getRootRef().update(d)
        })
}

export default ChangeRoomName;