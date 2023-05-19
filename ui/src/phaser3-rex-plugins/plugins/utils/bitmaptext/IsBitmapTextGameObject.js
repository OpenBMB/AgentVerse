const BitmapTextKlass = Phaser.GameObjects.BitmapText;

var IsBitmapTextGameObject = function (gameObject) {
    return (gameObject instanceof BitmapTextKlass);
}

export default IsBitmapTextGameObject;