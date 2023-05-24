import Recorder from './logic/runcommands/arcadetcrp/Recorder';
import Player from './logic/runcommands/arcadetcrp/Player';
import StepRunner from './logic/runcommands/arcadetcrp/StepRunner';
import RunCommands from './logic/runcommands/RunCommands';

declare var ArcadeTCRP: {
    Recorder: typeof Recorder,
    Player: typeof Player,
    StepRunner: typeof StepRunner,
    RunCommands: typeof RunCommands,
}