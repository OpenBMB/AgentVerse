import DeepClone from '../../../../plugins/utils/object/DeepClone.js';
import DefaultCreateBackground from './CreateBackground.js';
import DefaultCreateText from './CreateText.js';
import TextArea from '../../textarea/TextArea.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateTextArea = function (scene, config, creators) {
    config = (config) ? DeepClone(config) : {};

    var createBackground = GetValue(creators, 'background', DefaultCreateBackground);
    var createText = GetValue(creators, 'text', DefaultCreateText);
    var createTrack = GetValue(creators, 'track', DefaultCreateBackground);
    var createThumb = GetValue(creators, 'thumb', DefaultCreateBackground);

    if (createBackground) {
        config.background = createBackground(scene, config.background);
    } else {
        delete config.background;
    }

    if (createText) {
        config.text = createText(scene, config.text);
    } else {
        delete config.text;
    }

    var sliderConfig = config.slider;
    if (sliderConfig !== false) {
        if (sliderConfig === undefined) {
            sliderConfig = {};
        }

        if (createTrack) {
            sliderConfig.track = createTrack(scene, sliderConfig.track);
        } else {
            delete sliderConfig.track;
        }

        if (createThumb) {
            sliderConfig.thumb = createThumb(scene, sliderConfig.thumb);
        } else {
            delete sliderConfig.thumb;
        }

        config.slider = sliderConfig;
    }

    // No header
    // No footer

    var gameObject = new TextArea(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateTextArea;