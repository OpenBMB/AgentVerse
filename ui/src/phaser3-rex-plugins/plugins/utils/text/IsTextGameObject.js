const TextKlass = Phaser.GameObjects.Text;

var IsTextGameObject = function (gameObject) {
    return (gameObject instanceof TextKlass);
}

export default IsTextGameObject;