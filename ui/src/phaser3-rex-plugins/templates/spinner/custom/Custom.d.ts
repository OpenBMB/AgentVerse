import Base from '../base/Base';
import * as Geoms from '../../../plugins/gameobjects/shape/shapes/geoms';

export default Custom;

declare namespace Custom {

    type NameTypes = string | string[] | number;

    type Arc = Geoms.Arc;
    type Circle = Geoms.Circle;
    type Curve = Geoms.Curve;
    type Ellipse = Geoms.Ellipse;
    type Line = Geoms.Line;
    type Lines = Geoms.Lines;
    type Rectangle = Geoms.Rectangle;
    type RoundRectangle = Geoms.RoundRectangle;
    type Triangle = Geoms.Triangle;
    type ShapeTypes = Arc | Circle | Curve | Ellipse |
        Line | Lines | Rectangle | RoundRectangle | Triangle;

    interface IConfig extends Base.IConfig {
        create?: {
            arc?: NameTypes,
            circle?: NameTypes,
            ellipse?: NameTypes,
            line?: NameTypes,
            lines?: NameTypes,
            rectangle?: NameTypes,
            triangle?: NameTypes,
        } | ((this: Custom) => void);

        update?: (this: Custom) => void;

        type?: string,
    }

}

declare class Custom extends Base {
    constructor(
        scene: Phaser.Scene,
        config?: Custom.IConfig
    )

    getShape(name: string): Custom.ShapeTypes;
    getShapes(): Custom.ShapeTypes[];
}