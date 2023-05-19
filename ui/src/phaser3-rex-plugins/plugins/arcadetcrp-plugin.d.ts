import Recorder from './logic/runcommands/arcadetcrp/Recorder';
import Player from './logic/runcommands/arcadetcrp/Player';
import StepRunner from './logic/runcommands/arcadetcrp/StepRunner'
import RunCommands from './logic/runcommands/RunCommands';


export default class TCRPPlugin extends Phaser.Plugins.BasePlugin {
    addRecorder(
        parent: Phaser.Scene | Phaser.GameObjects.GameObject,
        config?: Recorder.IConfig
    ): Recorder;

    addPlayer(
        parent: Phaser.Scene | Phaser.GameObjects.GameObject,
        config?: Player.IConfig
    ): Player

    addStepRunner(
        parent: Phaser.Scene | Phaser.GameObjects.GameObject,
    ): StepRunner;

    runCommands: typeof RunCommands;
}