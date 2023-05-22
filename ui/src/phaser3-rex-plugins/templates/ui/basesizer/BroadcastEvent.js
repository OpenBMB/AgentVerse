var BroadcastEvent = function () {
    var gameObjects = this.getAllChildren([this]);
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        var gameObject = gameObjects[i];
        gameObject.emit.apply(gameObject, arguments);
    }
    return this;
}

export default BroadcastEvent;