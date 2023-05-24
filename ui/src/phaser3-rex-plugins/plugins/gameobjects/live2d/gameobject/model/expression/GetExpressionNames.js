var GetExpressionNames = function () {
    var names = [];
    var count = this._expressions.getSize();
    var keyValuse = this._expressions._keyValues;
    for (var i = 0; i < count; i++) {
        names.push(keyValuse[i].first);
    }
    return names;
}

export default GetExpressionNames;