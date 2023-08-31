import AddViewportCoordinateProperties from './viewportcoordinate';
import { VPXYToXY } from './viewportcoordinate';

export default class PolarCoordinatePlugin extends Phaser.Plugins.BasePlugin {
    add: typeof AddViewportCoordinateProperties;
    vpxyToxy: typeof VPXYToXY;
}