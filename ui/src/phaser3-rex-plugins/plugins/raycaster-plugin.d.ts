import Raycaster from './raycaster';

export default class RaycasterPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: Raycaster.IConfig
    ): Raycaster;

}