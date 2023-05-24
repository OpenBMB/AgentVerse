const SoundObjectClass = Phaser.Sound.BaseSound;
var IsSoundObject = function (object) {
    return (object instanceof SoundObjectClass);
}

export default IsSoundObject;