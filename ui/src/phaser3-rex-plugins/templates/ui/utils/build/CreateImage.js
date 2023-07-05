const PhaserImage = Phaser.GameObjects.Image;

var CreateImage = function (scene, config) {
    var gameObject = new PhaserImage(scene, 0, 0, '');
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateImage;