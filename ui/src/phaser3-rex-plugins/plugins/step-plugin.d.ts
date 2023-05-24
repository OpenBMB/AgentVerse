import Step from './step';

export default class StepPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Step.IConfig
    ): Step;

}