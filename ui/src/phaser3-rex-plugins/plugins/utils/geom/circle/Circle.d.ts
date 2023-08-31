import Point from '../point/Point';
import Rectangle from '../rectangle/Rectangle';

/**
 * A Circle object.
 * 
 * This is a geometry object, containing numerical values and related methods to inspect and modify them.
 * It is not a Game Object, in that you cannot add it to the display list, and it has no texture.
 * To render a Circle you should look at the capabilities of the Graphics class.
 */
declare class Circle {
    /**
     * 
     * @param x The x position of the center of the circle. Default 0.
     * @param y The y position of the center of the circle. Default 0.
     * @param radius The radius of the circle. Default 0.
     */
    constructor(x?: number, y?: number, radius?: number);

    /**
     * Calculates the area of the circle.
     * @param circle The Circle to get the area of.
     */
    static Area(circle: Circle): number;

    /**
     * The geometry constant type of this object: `GEOM_CONST.CIRCLE`.
     * Used for fast type comparisons.
     */
    readonly type: number;

    /**
     * The x position of the center of the circle.
     */
    x: number;

    /**
     * The y position of the center of the circle.
     */
    y: number;

    /**
     * Check to see if the Circle contains the given x / y coordinates.
     * @param x The x coordinate to check within the circle.
     * @param y The y coordinate to check within the circle.
     */
    contains(x: number, y: number): boolean;

    /**
     * Returns a Point object containing the coordinates of a point on the circumference of the Circle
     * based on the given angle normalized to the range 0 to 1. I.e. a value of 0.5 will give the point
     * at 180 degrees around the circle.
     * @param position A value between 0 and 1, where 0 equals 0 degrees, 0.5 equals 180 degrees and 1 equals 360 around the circle.
     * @param out An object to store the return values in. If not given a Point object will be created.
     */
    getPoint<O extends Point>(position: number, out?: O): O;

    /**
     * Returns an array of Point objects containing the coordinates of the points around the circumference of the Circle,
     * based on the given quantity or stepRate values.
     * @param quantity The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
     * @param stepRate Sets the quantity by getting the circumference of the circle and dividing it by the stepRate.
     * @param output An array to insert the points in to. If not provided a new array will be created.
     */
    getPoints<O extends Point[]>(quantity: number, stepRate?: number, output?: O): O;

    /**
     * Returns a uniformly distributed random point from anywhere within the Circle.
     * @param point A Point or point-like object to set the random `x` and `y` values in.
     */
    getRandomPoint<O extends Point>(point?: O): O;

    /**
     * Sets the x, y and radius of this circle.
     * @param x The x position of the center of the circle. Default 0.
     * @param y The y position of the center of the circle. Default 0.
     * @param radius The radius of the circle. Default 0.
     */
    setTo(x?: number, y?: number, radius?: number): this;

    /**
     * Sets this Circle to be empty with a radius of zero.
     * Does not change its position.
     */
    setEmpty(): this;

    /**
     * Sets the position of this Circle.
     * @param x The x position of the center of the circle. Default 0.
     * @param y The y position of the center of the circle. Default 0.
     */
    setPosition(x?: number, y?: number): this;

    /**
     * Checks to see if the Circle is empty: has a radius of zero.
     */
    isEmpty(): boolean;

    /**
     * The radius of the Circle.
     */
    radius: number;

    /**
     * The diameter of the Circle.
     */
    diameter: number;

    /**
     * The left position of the Circle.
     */
    left: number;

    /**
     * The right position of the Circle.
     */
    right: number;

    /**
     * The top position of the Circle.
     */
    top: number;

    /**
     * The bottom position of the Circle.
     */
    bottom: number;

    /**
     * Returns the circumference of the given Circle.
     * @param circle The Circle to get the circumference of.
     */
    static Circumference(circle: Circle): number;

    /**
     * Returns a Point object containing the coordinates of a point on the circumference of the Circle based on the given angle.
     * @param circle The Circle to get the circumference point on.
     * @param angle The angle from the center of the Circle to the circumference to return the point from. Given in radians.
     * @param out A Point, or point-like object, to store the results in. If not given a Point will be created.
     */
    static CircumferencePoint<O extends Point>(circle: Circle, angle: number, out?: O): O;

    /**
     * Creates a new Circle instance based on the values contained in the given source.
     * @param source The Circle to be cloned. Can be an instance of a Circle or a circle-like object, with x, y and radius properties.
     */
    static Clone(source: Circle | object): Circle;

    /**
     * Check to see if the Circle contains the given x / y coordinates.
     * @param circle The Circle to check.
     * @param x The x coordinate to check within the circle.
     * @param y The y coordinate to check within the circle.
     */
    static Contains(circle: Circle, x: number, y: number): boolean;

    /**
     * Check to see if the Circle contains the given Point object.
     * @param circle The Circle to check.
     * @param point The Point object to check if it's within the Circle or not.
     */
    static ContainsPoint(circle: Circle, point: Point | object): boolean;

    /**
     * Check to see if the Circle contains all four points of the given Rectangle object.
     * @param circle The Circle to check.
     * @param rect The Rectangle object to check if it's within the Circle or not.
     */
    static ContainsRect(circle: Circle, rect: Rectangle | object): boolean;

    /**
     * Copies the `x`, `y` and `radius` properties from the `source` Circle
     * into the given `dest` Circle, then returns the `dest` Circle.
     * @param source The source Circle to copy the values from.
     * @param dest The destination Circle to copy the values to.
     */
    static CopyFrom<O extends Circle>(source: Circle, dest: O): O;

    /**
     * Compares the `x`, `y` and `radius` properties of the two given Circles.
     * Returns `true` if they all match, otherwise returns `false`.
     * @param circle The first Circle to compare.
     * @param toCompare The second Circle to compare.
     */
    static Equals(circle: Circle, toCompare: Circle): boolean;

    /**
     * Returns the bounds of the Circle object.
     * @param circle The Circle to get the bounds from.
     * @param out A Rectangle, or rectangle-like object, to store the circle bounds in. If not given a new Rectangle will be created.
     */
    static GetBounds<O extends Rectangle>(circle: Circle, out?: O): O;

    /**
     * Returns a Point object containing the coordinates of a point on the circumference of the Circle
     * based on the given angle normalized to the range 0 to 1. I.e. a value of 0.5 will give the point
     * at 180 degrees around the circle.
     * @param circle The Circle to get the circumference point on.
     * @param position A value between 0 and 1, where 0 equals 0 degrees, 0.5 equals 180 degrees and 1 equals 360 around the circle.
     * @param out An object to store the return values in. If not given a Point object will be created.
     */
    static GetPoint<O extends Point>(circle: Circle, position: number, out?: O): O;

    /**
     * Returns an array of Point objects containing the coordinates of the points around the circumference of the Circle,
     * based on the given quantity or stepRate values.
     * @param circle The Circle to get the points from.
     * @param quantity The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
     * @param stepRate Sets the quantity by getting the circumference of the circle and dividing it by the stepRate.
     * @param output An array to insert the points in to. If not provided a new array will be created.
     */
    static GetPoints(circle: Circle, quantity: number, stepRate?: number, output?: any[]): Point[];

    /**
     * Offsets the Circle by the values given.
     * @param circle The Circle to be offset (translated.)
     * @param x The amount to horizontally offset the Circle by.
     * @param y The amount to vertically offset the Circle by.
     */
    static Offset<O extends Circle>(circle: O, x: number, y: number): O;

    /**
     * Offsets the Circle by the values given in the `x` and `y` properties of the Point object.
     * @param circle The Circle to be offset (translated.)
     * @param point The Point object containing the values to offset the Circle by.
     */
    static OffsetPoint<O extends Circle>(circle: O, point: Point | object): O;

    /**
     * Returns a uniformly distributed random point from anywhere within the given Circle.
     * @param circle The Circle to get a random point from.
     * @param out A Point or point-like object to set the random `x` and `y` values in.
     */
    static Random<O extends Point>(circle: Circle, out?: O): O;

}

export default Circle;