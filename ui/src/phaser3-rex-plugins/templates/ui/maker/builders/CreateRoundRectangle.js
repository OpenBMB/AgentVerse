import MergeStyle from './utils/MergeStyle.js';
import RoundRectangle from '../../roundrectangle/RoundRectangle.js';

var CreateRoundRectangle = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var gameObject = new RoundRectangle(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateRoundRectangle;