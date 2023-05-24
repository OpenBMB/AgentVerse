import { GetFilterString } from './utils/RoomFilterMethods.js';

var Methods = {
    getRootRef(childKey) {
        var ref = this.database.ref(this.rootPath);
        if (childKey) {
            ref = ref.child(childKey);
        }
        return ref;
    },

    getRoomRef(roomID, childKey) {
        var ref = this.getRootRef('rooms');
        if (roomID !== undefined) {
            ref = ref.child(roomID);
            if (childKey !== undefined) {
                ref = ref.child(childKey);
            }
        }
        return ref;
    },

    getRoomAliveRef(roomID) {
        return this.getRoomRef(roomID, 'alive');
    },

    getUserListRef(roomID) {
        return this.getRoomRef(roomID, 'users');
    },

    getRoomFilterRef(roomID) {
        var ref = this.getRootRef('room-filters');
        if (roomID !== undefined) {
            ref = ref.child(roomID);
        }
        return ref;
    },

    getRoomDataRef(roomID) {
        var ref = this.getRootRef('room-data');
        if (roomID !== undefined) {
            ref = ref.child(roomID);
        }
        return ref;
    },

    // TODO: ??
    getUserDataRef(userID) {
        var ref = this.getRootRef('user-data');
        if (userID !== undefined) {
            ref = ref.child(userID);
        }
        return ref;
    },

    getRoomDataPath(roomID, childKey) {
        var path = `${this.rootPath}/rooms/${roomID}`;
        if (childKey) {
            path += `/${childKey}`;
        }
        return path;
    },

    getUserListPath(roomID) {
        return this.getRoomDataPath(roomID, 'users');
    },

    getItemTablePath(roomID, key) {
        return `${this.getRoomDataPath(roomID, 'tables')}/${key}`;
    }, 

    getRoomListQuery(roomType, roomState) {
        if (roomState === undefined) {
            roomState = 'open';
        }
        var query = this.getRoomFilterRef();
        query = query.orderByChild('filter');
        if (roomType === undefined) {
            query = query.startAt(roomState).endAt(`${roomState}~`);
        } else {
            query = query.equalTo(GetFilterString(roomState, roomType));
        }
        return query;
    }
}

export default Methods;