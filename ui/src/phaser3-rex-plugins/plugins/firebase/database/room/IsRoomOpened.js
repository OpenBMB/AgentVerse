import { GetRoomState } from './utils/RoomFilterMethods.js';

var IsRoomOpened = function (metadata) {
    if (metadata == null) {
        return false;
    }

    var state = GetRoomState(metadata.filter);
    if (state === 'closed') {
        return false;
    }

    var userID = this.userID;
    var IsModerator = metadata.moderators.hasOwnProperty(userID);
    if (IsModerator) {
        return true;
    }

    switch (metadata.permission) {
        case 'black-list':
            var blackList = metadata['black-list'];
            return !(blackList && blackList.hasOwnProperty(userID));

        case 'white-list':
            var whiteList = metadata['white-list'];
            return whiteList && whiteList.hasOwnProperty(userID);

        default: // 'anyone'
            return true;
    }
}

export default IsRoomOpened;