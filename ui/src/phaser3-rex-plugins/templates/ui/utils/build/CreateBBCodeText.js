import BBCodeText from '../../bbcodetext/BBCodeText.js';

var CreateBBCodeText = function (scene, style) {
    var gameObject = new BBCodeText(scene, 0, 0, '', style);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateBBCodeText;