var JoinRoom = function () {
    var self = this;
    return this.userList.join()
        .then(function () {
            self.emit('room.join');
            return Promise.resolve();
        })
}

export default JoinRoom;