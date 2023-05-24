var SortByDisplayOrder = function (gameObjects) {
    if (gameObjects.length < 2) {
        return gameObjects;
    }
    var input = gameObjects[0].scene.input;
    return input.sortGameObjects(gameObjects);
}
export default SortByDisplayOrder;