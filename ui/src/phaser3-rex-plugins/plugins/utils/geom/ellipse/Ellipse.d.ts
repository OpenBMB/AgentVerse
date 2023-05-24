import Point from '../point/Point';
import Rectangle from '../rectangle/Rectangle';

/**
 * An Ellipse object.
 * 
 * This is a geometry object, containing numerical values and related methods to inspect and modify them.
 * It is not a Game Object, in that you cannot add it to the display list, and it has no texture.
 * To render an Ellipse you should look at the capabilities of the Graphics class.
 */
declare class Ellipse {
    /**
     * 
     * @param x The x position of the center of the ellipse. Default 0.
     * @param y The y position of the center of the ellipse. Default 0.
     * @param width The width of the ellipse. Default 0.
     * @param height The height of the ellipse. Default 0.
     */
    constructor(x?: number, y?: number, width?: number, height?: number);

    /**
     * Calculates the area of the Ellipse.
     * @param ellipse The Ellipse to get the area of.
     */
    static Area(ellipse: Ellipse): number;

    /**
     * Returns the circumference of the given Ellipse.
     * @param ellipse The Ellipse to get the circumference of.
     */
    static Circumference(ellipse: Ellipse): number;

    /**
     * Returns a Point object containing the coordinates of a point on the circumference of the Ellipse based on the given angle.
     * @param ellipse The Ellipse to get the circumference point on.
     * @param angle The angle from the center of the Ellipse to the circumference to return the point from. Given in radians.
     * @param out A Point, or point-like object, to store the results in. If not given a Point will be created.
     */
    static CircumferencePoint<O extends Point>(ellipse: Ellipse, angle: number, out?: O): O;

    /**
     * Creates a new Ellipse instance based on the values contained in the given source.
     * @param source The Ellipse to be cloned. Can be an instance of an Ellipse or a ellipse-like object, with x, y, width and height properties.
     */
    static Clone(source: Ellipse): Ellipse;

    /**
     * Check to see if the Ellipse contains the given x / y coordinates.
     * @param ellipse The Ellipse to check.
     * @param x The x coordinate to check within the ellipse.
     * @param y The y coordinate to check within the ellipse.
     */
    static Contains(ellipse: Ellipse, x: number, y: number): boolean;

    /**
     * Check to see if the Ellipse contains the given Point object.
     * @param ellipse The Ellipse to check.
     * @param point The Point object to check if it's within the Circle or not.
     */
    static ContainsPoint(ellipse: Ellipse, point: Point | object): boolean;

    /**
     * Check to see if the Ellipse contains all four points of the given Rectangle object.
     * @param ellipse The Ellipse to check.
     * @param rect The Rectangle object to check if it's within the Ellipse or not.
     */
    static ContainsRect(ellipse: Ellipse, rect: Rectangle | object): boolean;

    /**
     * Copies the `x`, `y`, `width` and `height` properties from the `source` Ellipse
     * into the given `dest` Ellipse, then returns the `dest` Ellipse.
     * @param source The source Ellipse to copy the values from.
     * @param dest The destination Ellipse to copy the values to.
     */
    static CopyFrom<O extends Ellipse>(source: Ellipse, dest: O): O;

    /**
     * The geometry constant type of this object: `GEOM_CONST.ELLIPSE`.
     * Used for fast type comparisons.
     */
    readonly type: number;

    /**
     * The x position of the center of the ellipse.
     */
    x: number;

    /**
     * The y position of the center of the ellipse.
     */
    y: number;

    /**
     * The width of the ellipse.
     */
    width: number;

    /**
     * The height of the ellipse.
     */
    height: number;

    /**
     * Check to see if the Ellipse contains the given x / y coordinates.
     * @param x The x coordinate to check within the ellipse.
     * @param y The y coordinate to check within the ellipse.
     */
    contains(x: number, y: number): boolean;

    /**
     * Returns a Point object containing the coordinates of a point on the circumference of the Ellipse
     * based on the given angle normalized to the range 0 to 1. I.e. a value of 0.5 will give the point
     * at 180 degrees around the circle.
     * @param position A value between 0 and 1, where 0 equals 0 degrees, 0.5 equals 180 degrees and 1 equals 360 around the ellipse.
     * @param out An object to store the return values in. If not given a Point object will be created.
     */
    getPoint<O extends Point>(position: number, out?: O): O;

    /**
     * Returns an array of Point objects containing the coordinates of the points around the circumference of the Ellipse,
     * based on the given quantity or stepRate values.
     * @param quantity The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
     * @param stepRate Sets the quantity by getting the circumference of the ellipse and dividing it by the stepRate.
     * @param output An array to insert the points in to. If not provided a new array will be created.
     */
    getPoints<O extends Point[]>(quantity: number, stepRate?: number, output?: O): O;

    /**
     * Returns a uniformly distributed random point from anywhere within the given Ellipse.
     * @param point A Point or point-like object to set the random `x` and `y` values in.
     */
    getRandomPoint<O extends Point>(point?: O): O;

    /**
     * Sets the x, y, width and height of this ellipse.
     * @param x The x position of the center of the ellipse.
     * @param y The y position of the center of the ellipse.
     * @param width The width of the ellipse.
     * @param height The height of the ellipse.
     */
    setTo(x: number, y: number, width: number, height: number): this;

    /**
     * Sets this Ellipse to be empty with a width and height of zero.
     * Does not change its position.
     */
    setEmpty(): this;

    /**
     * Sets the position of this Ellipse.
     * @param x The x position of the center of the ellipse.
     * @param y The y position of the center of the ellipse.
     */
    setPosition(x: number, y: number): this;

    /**
     * Sets the size of this Ellipse.
     * Does not change its position.
     * @param width The width of the ellipse.
     * @param height The height of the ellipse. Default width.
     */
    setSize(width: number, height?: number): this;

    /**
     * Checks to see if the Ellipse is empty: has a width or height equal to zero.
     */
    isEmpty(): boolean;

    /**
     * Returns the minor radius of the ellipse. Also known as the Semi Minor Axis.
     */
    getMinorRadius(): number;

    /**
     * Returns the major radius of the ellipse. Also known as the Semi Major Axis.
     */
    getMajorRadius(): number;

    /**
     * The left position of the Ellipse.
     */
    left: number;

    /**
     * The right position of the Ellipse.
     */
    right: number;

    /**
     * The top position of the Ellipse.
     */
    top: number;

    /**
     * The bottom position of the Ellipse.
     */
    bottom: number;

    /**
     * Compares the `x`, `y`, `width` and `height` properties of the two given Ellipses.
     * Returns `true` if they all match, otherwise returns `false`.
     * @param ellipse The first Ellipse to compare.
     * @param toCompare The second Ellipse to compare.
     */
    static Equals(ellipse: Ellipse, toCompare: Ellipse): boolean;

    /**
     * Returns the bounds of the Ellipse object.
     * @param ellipse The Ellipse to get the bounds from.
     * @param out A Rectangle, or rectangle-like object, to store the ellipse bounds in. If not given a new Rectangle will be created.
     */
    static GetBounds<O extends Rectangle>(ellipse: Ellipse, out?: O): O;

    /**
     * Returns a Point object containing the coordinates of a point on the circumference of the Ellipse
     * based on the given angle normalized to the range 0 to 1. I.e. a value of 0.5 will give the point
     * at 180 degrees around the circle.
     * @param ellipse The Ellipse to get the circumference point on.
     * @param position A value between 0 and 1, where 0 equals 0 degrees, 0.5 equals 180 degrees and 1 equals 360 around the ellipse.
     * @param out An object to store the return values in. If not given a Point object will be created.
     */
    static GetPoint<O extends Point>(ellipse: Ellipse, position: number, out?: O): O;

    /**
     * Returns an array of Point objects containing the coordinates of the points around the circumference of the Ellipse,
     * based on the given quantity or stepRate values.
     * @param ellipse The Ellipse to get the points from.
     * @param quantity The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
     * @param stepRate Sets the quantity by getting the circumference of the ellipse and dividing it by the stepRate.
     * @param out An array to insert the points in to. If not provided a new array will be created.
     */
    static GetPoints<O extends Point[]>(ellipse: Ellipse, quantity: number, stepRate?: number, out?: O): O;

    /**
     * Offsets the Ellipse by the values given.
     * @param ellipse The Ellipse to be offset (translated.)
     * @param x The amount to horizontally offset the Ellipse by.
     * @param y The amount to vertically offset the Ellipse by.
     */
    static Offset<O extends Ellipse>(ellipse: O, x: number, y: number): O;

    /**
     * Offsets the Ellipse by the values given in the `x` and `y` properties of the Point object.
     * @param ellipse The Ellipse to be offset (translated.)
     * @param point The Point object containing the values to offset the Ellipse by.
     */
    static OffsetPoint<O extends Ellipse>(ellipse: O, point: Point | object): O;

    /**
     * Returns a uniformly distributed random point from anywhere within the given Ellipse.
     * @param ellipse The Ellipse to get a random point from.
     * @param out A Point or point-like object to set the random `x` and `y` values in.
     */
    static Random<O extends Point>(ellipse: Ellipse, out?: O): O;

}

export default Ellipse;