var GetQuery = function (data) {
    var query = this.baseQuery;
    var isItem = (data instanceof this.customClass);
    var key, value;
    for (var i = 0, cnt = this.primaryKeys.length; i < cnt; i++) {
        key = this.primaryKeys[i];
        value = (isItem) ? data.get(key) : data[key];
        query.equalTo(key, value);
    }
    return query;
}

export default GetQuery;