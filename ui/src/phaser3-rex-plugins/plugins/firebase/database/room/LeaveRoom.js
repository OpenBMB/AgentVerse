var LeaveRoom = function () {
    if (!this.isInRoom()) {
        return Promise.resolve();
    }

    // 'userlist.leave' event -> 'room.leave' event -> then
    this.leftRoomFlag = true;
    if (this.isRemoveRoomWhenLeft) {
        // Remove room, include user list
        return this.removeRoom()
    } else {
        var prevRoomInfo = this.getRoomInfo();
        // Leave user list only        
        return this.userList.leave()
            .then(function () {
                return Promise.resolve(prevRoomInfo)
            })
    }
}

export default LeaveRoom;