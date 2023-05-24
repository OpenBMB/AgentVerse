var GetRoomState = function (filterString) {
    return filterString.split('|')[0];
}

var GetRoomType = function (filterString) {
    return filterString.split('|')[1];
}

var GetFilterString = function (roomState, roomType) {
    if (roomType === undefined) {
        roomType = '';
    }
    return `${roomState}|${roomType}`;
}

export {
    GetRoomState,
    GetRoomType,
    GetFilterString
};