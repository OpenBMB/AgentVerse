var GetMotionGroupNames = function () {
    var names = [];
    var count = this._motions.getSize();
    var keyValuse = this._motions._keyValues;
    for (var i = 0; i < count; i++) {
        var name = keyValuse[i].first;
        var groupName = name.split('_')[0];
        if (names.indexOf(groupName) !== -1) {
            continue;
        }

        names.push(groupName);
    }
    return names;
}

export default GetMotionGroupNames;