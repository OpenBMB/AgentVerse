import ItemList from '../utils/itemlist/ItemList.js';

var GetUserList = function (roomID) {
    if (roomID === undefined) {
        return this.userList.getUsers();
    }

    var self = this;
    return new Promise(function (resolve, reject) {
        var userList = new ItemList({
            itemIDKey: 'joinAt',
            mode: 'once'
        })

        userList
            .once('update', function (users) {
                resolve(users)
            })
            .startUpdate(self.getUserListRef(roomID));
    })
}

export default GetUserList;