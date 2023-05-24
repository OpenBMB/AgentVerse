var GetRoomList = function (roomType, roomState) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.roomList
            .once('roomlist.update', function (rooms) {
                resolve(rooms)
            })
            .startUpdate(self.getRoomListQuery(roomType, roomState));
    })
}

export default GetRoomList;