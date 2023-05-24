import Scale from './scale';
import ScaleDown from './behaviors/scale/ScaleDown';
import ScaleDownDestroy from './scale-down-destroy';
import PopUp from './popup';
import Yoyo from './behaviors/scale/Yoyo';

export default class ScalePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Scale.IConfig
    ): Scale;

    scaleDown: typeof ScaleDown;
    scaleDownDestroy: typeof ScaleDownDestroy;
    popUp: typeof PopUp;
    yoyo: typeof Yoyo;
}