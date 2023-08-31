var AddVertices = function (gameObjects) {
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        this.addVertex(gameObjects[i]);
    }
    return this;
}

export default AddVertices;