const SceneClass = Phaser.Scene;
var IsSceneObject = function (object) {
    return (object instanceof SceneClass);
}
export default IsSceneObject;