import {Vector2Like} from '../types';
import Rectangle from '../rectangle/Rectangle';

/**
 * Defines a Point in 2D space, with an x and y component.
 */
declare class Point {
    /**
     * 
     * @param x The x coordinate of this Point. Default 0.
     * @param y The y coordinate of this Point. Default x.
     */
    constructor(x?: number, y?: number);

    /**
     * Apply `Math.ceil()` to each coordinate of the given Point.
     * @param point The Point to ceil.
     */
    static Ceil<O extends Point>(point: O): O;

    /**
     * Clone the given Point.
     * @param source The source Point to clone.
     */
    static Clone(source: Point): Point;

    /**
     * Copy the values of one Point to a destination Point.
     * @param source The source Point to copy the values from.
     * @param dest The destination Point to copy the values to.
     */
    static CopyFrom<O extends Point>(source: Point, dest: O): O;

    /**
     * A comparison of two `Point` objects to see if they are equal.
     * @param point The original `Point` to compare against.
     * @param toCompare The second `Point` to compare.
     */
    static Equals(point: Point, toCompare: Point): boolean;

    /**
     * Apply `Math.ceil()` to each coordinate of the given Point.
     * @param point The Point to floor.
     */
    static Floor<O extends Point>(point: O): O;

    /**
     * Get the centroid or geometric center of a plane figure (the arithmetic mean position of all the points in the figure).
     * Informally, it is the point at which a cutout of the shape could be perfectly balanced on the tip of a pin.
     * @param points An array of Vector2Like objects to get the geometric center of.
     * @param out A Point object to store the output coordinates in. If not given, a new Point instance is created.
     */
    static GetCentroid<O extends Point>(points: Vector2Like[], out?: O): O;

    /**
     * Calculate the magnitude of the point, which equivalent to the length of the line from the origin to this point.
     * @param point The point to calculate the magnitude for
     */
    static GetMagnitude(point: Point): number;

    /**
     * Calculates the square of magnitude of given point.(Can be used for fast magnitude calculation of point)
     * @param point Returns square of the magnitude/length of given point.
     */
    static GetMagnitudeSq(point: Point): number;

    /**
     * Calculates the Axis Aligned Bounding Box (or aabb) from an array of points.
     * @param points An array of Vector2Like objects to get the AABB from.
     * @param out A Rectangle object to store the results in. If not given, a new Rectangle instance is created.
     */
    static GetRectangleFromPoints<O extends Rectangle>(points: Vector2Like[], out?: O): O;

    /**
     * Returns the linear interpolation point between the two given points, based on `t`.
     * @param pointA The starting `Point` for the interpolation.
     * @param pointB The target `Point` for the interpolation.
     * @param t The amount to interpolate between the two points. Generally, a value between 0 (returns the starting `Point`) and 1 (returns the target `Point`). If omitted, 0 is used. Default 0.
     * @param out An optional `Point` object whose `x` and `y` values will be set to the result of the interpolation (can also be any object with `x` and `y` properties). If omitted, a new `Point` created and returned.
     */
    static Interpolate<O extends Point>(pointA: Point, pointB: Point, t?: number, out?: O): O;

    /**
     * Swaps the X and the Y coordinate of a point.
     * @param point The Point to modify.
     */
    static Invert<O extends Point>(point: O): O;

    /**
     * Inverts a Point's coordinates.
     * @param point The Point to invert.
     * @param out The Point to return the inverted coordinates in.
     */
    static Negative<O extends Point>(point: Point, out?: O): O;

    /**
     * The geometry constant type of this object: `GEOM_CONST.POINT`.
     * Used for fast type comparisons.
     */
    readonly type: number;

    /**
     * The x coordinate of this Point.
     */
    x: number;

    /**
     * The y coordinate of this Point.
     */
    y: number;

    /**
     * Set the x and y coordinates of the point to the given values.
     * @param x The x coordinate of this Point. Default 0.
     * @param y The y coordinate of this Point. Default x.
     */
    setTo(x?: number, y?: number): this;

    /**
     * Calculates the vector projection of `pointA` onto the nonzero `pointB`. This is the
     * orthogonal projection of `pointA` onto a straight line parallel to `pointB`.
     * @param pointA Point A, to be projected onto Point B.
     * @param pointB Point B, to have Point A projected upon it.
     * @param out The Point object to store the position in. If not given, a new Point instance is created.
     */
    static Project<O extends Point>(pointA: Point, pointB: Point, out?: O): O;

    /**
     * Calculates the vector projection of `pointA` onto the nonzero `pointB`. This is the
     * orthogonal projection of `pointA` onto a straight line paralle to `pointB`.
     * @param pointA Point A, to be projected onto Point B. Must be a normalized point with a magnitude of 1.
     * @param pointB Point B, to have Point A projected upon it.
     * @param out The Point object to store the position in. If not given, a new Point instance is created.
     */
    static ProjectUnit<O extends Point>(pointA: Point, pointB: Point, out?: O): O;

    /**
     * Changes the magnitude (length) of a two-dimensional vector without changing its direction.
     * @param point The Point to treat as the end point of the vector.
     * @param magnitude The new magnitude of the vector.
     */
    static SetMagnitude<O extends Point>(point: O, magnitude: number): O;

}

export default Point;