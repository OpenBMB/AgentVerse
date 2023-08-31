import AudioFactory from './audio/Factory';
import BallFactory from './ball/Factory';
import BarsFactory from './bars/Factory';
import BoxFactory from './box/Factory';
import ClockFactory from './clock/Factory';
import CubeFactory from './cube/Factory';
import CustomFactory from './custom/Factory';
import DotsFactory from './dots/Factory';
import FacebookFactory from './facebook/Factory';
import GridFactory from './grid/Factory';
import LosFactory from './los/Factory';
import OrbitFactory from './orbit/Factory';
import OvalFactory from './oval/Factory';
import PieFactory from './pie/Factory';
import PuffFactory from './puff/Factory';
import RadioFactory from './radio/Factory';
import RingsFactory from './rings/Factory';
import SpinnerFactory from './spinner/Factory';

export default SpinnerPlugins;

declare class Factories {
    audio: typeof AudioFactory;
    ball: typeof BallFactory;
    bars: typeof BarsFactory;
    box: typeof BoxFactory;
    clock: typeof ClockFactory;
    cube: typeof CubeFactory;
    custom: typeof CustomFactory;
    dots: typeof DotsFactory;
    facebook: typeof FacebookFactory;
    grid: typeof GridFactory;
    los: typeof LosFactory;
    orbit: typeof OrbitFactory;
    oval: typeof OvalFactory;
    pie: typeof PieFactory;
    puff: typeof PuffFactory;
    radio: typeof RadioFactory;
    rings: typeof RingsFactory;
    spinner: typeof SpinnerFactory;
}

declare class SpinnerPlugins {
    constructor(scene: Phaser.Scene);

    add: Factories;
}

import AudioClass from './audio/Audio';
import BallClass from './ball/Ball';
import BarsClass from './bars/Bars';
import BoxClass from './box/Box';
import ClockClass from './clock/Clock';
import CubeClass from './cube/Cube';
import CustomClass from './custom/Custom';
import DotsClass from './dots/Dots';
import FacebookClass from './facebook/Facebook';
import GridClass from './grid/Grid';
import LosClass from './los/Los';
import OrbitClass from './orbit/Orbit';
import OvalClass from './oval/Oval';
import PieClass from './pie/Pie';
import PuffClass from './puff/Puff';
import RadioClass from './radio/Radio';
import RingsClass from './rings/Rings';
import SpinnerClass from './spinner/Spinner';

declare namespace SpinnerPlugins {
    type Audio = AudioClass;
    type Ball = BallClass;
    type Bars = BarsClass
    type Box = BoxClass;
    type Clock = ClockClass;
    type Cube = CubeClass;
    type Custom = CustomClass;
    type Dots = DotsClass;
    type Facebook = FacebookClass;
    type Grid = GridClass;
    type Los = LosClass;
    type Orbit = OrbitClass;
    type Oval = OvalClass;
    type Pie = PieClass;
    type Puff = PuffClass;
    type Radio = RadioClass;
    type Rings = RingsClass;
    type Spinner = SpinnerClass;
}