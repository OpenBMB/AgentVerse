import DownChild from './DownChild.js';
import UpChild from './UpChild.js';
import OverChild from './OverChild.js';
import ClickChild from './ClickChild.js';
import TapChild from './TapChild.js';
import PressChild from './PressChild.js';
import SwipeChild from './SwipeChild.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var SetChildrenInteractive = function (gameObject, config) {
    gameObject.setInteractive();

    gameObject._childrenInteractive = {
        targetSizers: GetValue(config, 'targets', [gameObject]),
        eventEmitter: GetValue(config, 'eventEmitter', gameObject),
        eventNamePrefix: GetValue(config, 'inputEventPrefix', 'child.')
    }

    DownChild.call(gameObject, config);
    UpChild.call(gameObject, config);
    OverChild.call(gameObject, config);
    ClickChild.call(gameObject, config);
    TapChild.call(gameObject, config);
    PressChild.call(gameObject, config);
    SwipeChild.call(gameObject, config);

    return gameObject;
}

export default SetChildrenInteractive;