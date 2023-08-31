var HasRoom = function (roomID) {
    if (roomID === this.roomID) {
        return Promise.resolve(true);
    }

    return this.getRoomDataRef(roomID).once('value')
        .then(function (snapshot) {
            var hasRoom = (snapshot.val() !== null);
            return Promise.resolve(hasRoom);
        })
}

export default HasRoom;