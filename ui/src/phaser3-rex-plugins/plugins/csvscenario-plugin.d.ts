import CSVScenario from './csvscenario';

export default class CSVScenarioPlugin extends Phaser.Plugins.BasePlugin {
    add(
        scene: Phaser.Scene,
        config?: CSVScenario.IConfig
    ): CSVScenario;

}