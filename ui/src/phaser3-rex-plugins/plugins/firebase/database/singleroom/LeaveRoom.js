var LeaveRoom = function () {
    if (!this.isInRoom()) {
        return Promise.resolve();
    }

    // 'userlist.leave' event -> 'room.leave' event -> then
    this.leftRoomFlag = true;
    return this.userList.leave();
}

export default LeaveRoom;