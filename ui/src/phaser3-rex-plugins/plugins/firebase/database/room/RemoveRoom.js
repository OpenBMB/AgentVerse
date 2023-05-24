var RemoveRoom = function (roomID) {
    if (roomID === undefined) {
        roomID = this.roomID;
    }
    if (roomID === undefined) {
        return Promise.resolve();
    }

    var d = {};
    d[`room-filter/${roomID}`] = null;
    d[`room-data/${roomID}`] = null;
    d[`rooms/${roomID}`] = null;

    var prevRoomInfo = this.getRoomInfo();
    return this.getRootRef().update(d)
        .then(function () {
            return Promise.resolve(prevRoomInfo);
        })
}

export default RemoveRoom;