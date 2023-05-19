import BBCodeText from '../../bbcodetext/BBCodeText.js';
import MergeStyle from './utils/MergeStyle.js';
import SetTextureProperties from './utils/SetTextureProperties.js';

var CreateBBCodeText = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var gameObject = new BBCodeText(scene, 0, 0, data.text, data);

    SetTextureProperties(gameObject, data);

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateBBCodeText;