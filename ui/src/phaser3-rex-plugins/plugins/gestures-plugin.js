import ObjectFactory from './input/gestures/ObjectFactory.js';

import TapFactory from './input/gestures/tap/Factory.js';
import PressFactory from './input/gestures/press/Factory.js';
import PanFactory from './input/gestures/pan/Factory.js';
import SwipeFactory from './input/gestures/swipe/Factory.js';
import PinchFactory from './input/gestures/pinch/Factory.js';
import RotateFactory from './input/gestures/rotate/Factory.js';

class GesturesPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }
}

export default GesturesPlugin;