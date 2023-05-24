import Recorder from './logic/runcommands/tcrp/Recorder';
import Player from './logic/runcommands/tcrp/Player';
import RunCommands from './logic/runcommands/RunCommands';

declare var TCRP: {
    Recorder: typeof Recorder,
    Player: typeof Player,
    RunCommands: typeof RunCommands
}

export default TCRP;