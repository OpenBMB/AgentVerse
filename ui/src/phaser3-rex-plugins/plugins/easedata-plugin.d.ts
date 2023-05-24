import { EaseData } from './easedata.js';

export default class ScalePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: EaseData.IConfig
    ): EaseData;
}