var GetMotionNames = function (groupName) {
    var names = [];
    var count = this._motions.getSize();
    var keyValuse = this._motions._keyValues;
    for (var i = 0; i < count; i++) {
        var name = keyValuse[i].first;
        if (groupName & !name.startsWith(groupName)) {
            continue;
        }
        names.push(name);
    }
    return names;
}

export default GetMotionNames;