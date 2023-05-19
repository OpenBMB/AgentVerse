const GameObjectClass = Phaser.GameObjects.GameObject;
var IsGameObject = function (object) {
    return (object instanceof GameObjectClass);
}
export default IsGameObject;