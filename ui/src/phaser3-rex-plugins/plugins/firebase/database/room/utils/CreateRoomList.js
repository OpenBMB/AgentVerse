import ItemList from '../../utils/itemlist/ItemList.js';

var CreateRoomList = function (config) {
    var roomList = new ItemList({
        eventEmitter: this.getEventEmitter(),
        root: this.getRoomFilterRef(),
        itemIDKey: 'roomID',
        eventNames: {
            update: 'roomlist.update',
            add: 'roomlist.add',
            remove: 'roomlist.remove',
            change: 'roomlist.change'
        },
        mode: 'once'
    })

    return roomList;
}

export default CreateRoomList;