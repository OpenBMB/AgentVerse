// Note: Not working in iOS9+

import CreateFileInput from './CreateFileInput.js';
import ClickPromise from '../../gameobjects/dom/filechooser/ClickPromise.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var Open = function (game, config) {
    // game: game, scene, or game object
    var closeDelay = GetValue(config, 'closeDelay', 200);
    var fileInput = CreateFileInput(config);
    fileInput.click();
    return ClickPromise({ game, fileInput, closeDelay })
        .then(function (result) {
            fileInput.remove();
            return Promise.resolve(result);
        })
}

export default Open;