
var RemoveChildrenMap = function (key) {
    if (typeof (key) === 'object') {
        var gameObject = key;
        for (var key in this.childrenMap) {
            if (this.childrenMap[key] === gameObject) {
                delete this.childrenMap[key];
                return this;
            }
        }
    }

    delete this.childrenMap[key];
    return this;
}

export default RemoveChildrenMap;