import Recorder from './logic/runcommands/tcrp/Recorder';
import Player from './logic/runcommands/tcrp/Player';
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

    runCommands: typeof RunCommands;
}