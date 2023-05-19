import Space from '../../space/Space.js';

var CreateSpace = function (scene, data, view, styles, customBuilders) {
    var gameObject = new Space(scene);
    // Don't add Zone into scene
    // this.scene.add.existing(gameObject);
    return gameObject;
}

export default CreateSpace;