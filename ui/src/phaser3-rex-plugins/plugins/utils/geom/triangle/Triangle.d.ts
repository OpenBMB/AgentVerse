import Point from '../point/Point';
import Circle from '../circle/Circle';
import Line from '../line/Line';
import { Vector2Like } from '../types';

/**
 * A triangle is a plane created by connecting three points.
 * The first two arguments specify the first point, the middle two arguments
 * specify the second point, and the last two arguments specify the third point.
 */
declare class Triangle {
    /**
     * 
     * @param x1 `x` coordinate of the first point. Default 0.
     * @param y1 `y` coordinate of the first point. Default 0.
     * @param x2 `x` coordinate of the second point. Default 0.
     * @param y2 `y` coordinate of the second point. Default 0.
     * @param x3 `x` coordinate of the third point. Default 0.
     * @param y3 `y` coordinate of the third point. Default 0.
     */
    constructor(x1?: number, y1?: number, x2?: number, y2?: number, x3?: number, y3?: number);

    /**
     * Returns the area of a Triangle.
     * @param triangle The Triangle to use.
     */
    static Area(triangle: Triangle): number;

    /**
     * Builds an equilateral triangle. In the equilateral triangle, all the sides are the same length (congruent) and all the angles are the same size (congruent).
     * The x/y specifies the top-middle of the triangle (x1/y1) and length is the length of each side.
     * @param x x coordinate of the top point of the triangle.
     * @param y y coordinate of the top point of the triangle.
     * @param length Length of each side of the triangle.
     */
    static BuildEquilateral(x: number, y: number, length: number): Triangle;

    /**
     * Takes an array of vertex coordinates, and optionally an array of hole indices, then returns an array
     * of Triangle instances, where the given vertices have been decomposed into a series of triangles.
     * @param data A flat array of vertex coordinates like [x0,y0, x1,y1, x2,y2, ...]
     * @param holes An array of hole indices if any (e.g. [5, 8] for a 12-vertex input would mean one hole with vertices 5–7 and another with 8–11). Default null.
     * @param scaleX Horizontal scale factor to multiply the resulting points by. Default 1.
     * @param scaleY Vertical scale factor to multiply the resulting points by. Default 1.
     * @param out An array to store the resulting Triangle instances in. If not provided, a new array is created.
     */
    static BuildFromPolygon<O extends Triangle[]>(data: any[], holes?: any[], scaleX?: number, scaleY?: number, out?: O): O;

    /**
     * Builds a right triangle, i.e. one which has a 90-degree angle and two acute angles.
     * @param x The X coordinate of the right angle, which will also be the first X coordinate of the constructed Triangle.
     * @param y The Y coordinate of the right angle, which will also be the first Y coordinate of the constructed Triangle.
     * @param width The length of the side which is to the left or to the right of the right angle.
     * @param height The length of the side which is above or below the right angle.
     */
    static BuildRight(x: number, y: number, width: number, height: number): Triangle;

    /**
     * Positions the Triangle so that it is centered on the given coordinates.
     * @param triangle The triangle to be positioned.
     * @param x The horizontal coordinate to center on.
     * @param y The vertical coordinate to center on.
     * @param centerFunc The function used to center the triangle. Defaults to Centroid centering.
     */
    static CenterOn<O extends Triangle>(triangle: O, x: number, y: number, centerFunc?: CenterFunction): O;

    /**
     * Calculates the position of a Triangle's centroid, which is also its center of mass (center of gravity).
     * 
     * The centroid is the point in a Triangle at which its three medians (the lines drawn from the vertices to the bisectors of the opposite sides) meet. It divides each one in a 2:1 ratio.
     * @param triangle The Triangle to use.
     * @param out An object to store the coordinates in.
     */
    static Centroid<O extends Point>(triangle: Triangle, out?: O): O;

    /**
     * Computes the circumcentre of a triangle. The circumcentre is the centre of
     * the circumcircle, the smallest circle which encloses the triangle. It is also
     * the common intersection point of the perpendicular bisectors of the sides of
     * the triangle, and is the only point which has equal distance to all three
     * vertices of the triangle.
     * @param triangle The Triangle to get the circumcenter of.
     * @param out The Vector2 object to store the position in. If not given, a new Vector2 instance is created.
     */
    static CircumCenter(triangle: Triangle, out?: Vector2Like): Vector2Like;

    /**
     * Finds the circumscribed circle (circumcircle) of a Triangle object. The circumcircle is the circle which touches all of the triangle's vertices.
     * @param triangle The Triangle to use as input.
     * @param out An optional Circle to store the result in.
     */
    static CircumCircle(triangle: Triangle, out?: Circle): Circle;

    /**
     * Clones a Triangle object.
     * @param source The Triangle to clone.
     */
    static Clone(source: Triangle): Triangle;

    /**
     * Checks if a point (as a pair of coordinates) is inside a Triangle's bounds.
     * @param triangle The Triangle to check.
     * @param x The X coordinate of the point to check.
     * @param y The Y coordinate of the point to check.
     */
    static Contains(triangle: Triangle, x: number, y: number): boolean;

    /**
     * Filters an array of point-like objects to only those contained within a triangle.
     * If `returnFirst` is true, will return an array containing only the first point in the provided array that is within the triangle (or an empty array if there are no such points).
     * @param triangle The triangle that the points are being checked in.
     * @param points An array of point-like objects (objects that have an `x` and `y` property)
     * @param returnFirst If `true`, return an array containing only the first point found that is within the triangle. Default false.
     * @param out If provided, the points that are within the triangle will be appended to this array instead of being added to a new array. If `returnFirst` is true, only the first point found within the triangle will be appended. This array will also be returned by this function.
     */
    static ContainsArray(triangle: Triangle, points: Point[], returnFirst?: boolean, out?: any[]): Point[];

    /**
     * Tests if a triangle contains a point.
     * @param triangle The triangle.
     * @param point The point to test, or any point-like object with public `x` and `y` properties.
     */
    static ContainsPoint(triangle: Triangle, point: Vector2Like): boolean;

    /**
     * Copy the values of one Triangle to a destination Triangle.
     * @param source The source Triangle to copy the values from.
     * @param dest The destination Triangle to copy the values to.
     */
    static CopyFrom<O extends Triangle>(source: Triangle, dest: O): O;

    /**
     * Decomposes a Triangle into an array of its points.
     * @param triangle The Triangle to decompose.
     * @param out An array to store the points into.
     */
    static Decompose(triangle: Triangle, out?: any[]): any[];

    /**
     * Returns true if two triangles have the same coordinates.
     * @param triangle The first triangle to check.
     * @param toCompare The second triangle to check.
     */
    static Equals(triangle: Triangle, toCompare: Triangle): boolean;

    /**
     * Returns a Point from around the perimeter of a Triangle.
     * @param triangle The Triangle to get the point on its perimeter from.
     * @param position The position along the perimeter of the triangle. A value between 0 and 1.
     * @param out An option Point, or Point-like object to store the value in. If not given a new Point will be created.
     */
    static GetPoint<O extends Point>(triangle: Triangle, position: number, out?: O): O;

    /**
     * Returns an array of evenly spaced points on the perimeter of a Triangle.
     * @param triangle The Triangle to get the points from.
     * @param quantity The number of evenly spaced points to return. Set to 0 to return an arbitrary number of points based on the `stepRate`.
     * @param stepRate If `quantity` is 0, the distance between each returned point.
     * @param out An array to which the points should be appended.
     */
    static GetPoints<O extends Point>(triangle: Triangle, quantity: number, stepRate: number, out?: O): O;

    /**
     * Calculates the position of the incenter of a Triangle object. This is the point where its three angle bisectors meet and it's also the center of the incircle, which is the circle inscribed in the triangle.
     * @param triangle The Triangle to find the incenter of.
     * @param out An optional Point in which to store the coordinates.
     */
    static InCenter<O extends Point>(triangle: Triangle, out?: O): O;

    /**
     * Moves each point (vertex) of a Triangle by a given offset, thus moving the entire Triangle by that offset.
     * @param triangle The Triangle to move.
     * @param x The horizontal offset (distance) by which to move each point. Can be positive or negative.
     * @param y The vertical offset (distance) by which to move each point. Can be positive or negative.
     */
    static Offset<O extends Triangle>(triangle: O, x: number, y: number): O;

    /**
     * Gets the length of the perimeter of the given triangle.
     * Calculated by adding together the length of each of the three sides.
     * @param triangle The Triangle to get the length from.
     */
    static Perimeter(triangle: Triangle): number;

    /**
     * Returns a random Point from within the area of the given Triangle.
     * @param triangle The Triangle to get a random point from.
     * @param out The Point object to store the position in. If not given, a new Point instance is created.
     */
    static Random<O extends Point>(triangle: Triangle, out?: O): O;

    /**
     * Rotates a Triangle about its incenter, which is the point at which its three angle bisectors meet.
     * @param triangle The Triangle to rotate.
     * @param angle The angle by which to rotate the Triangle, in radians.
     */
    static Rotate<O extends Triangle>(triangle: O, angle: number): O;

    /**
     * Rotates a Triangle at a certain angle about a given Point or object with public `x` and `y` properties.
     * @param triangle The Triangle to rotate.
     * @param point The Point to rotate the Triangle about.
     * @param angle The angle by which to rotate the Triangle, in radians.
     */
    static RotateAroundPoint<O extends Triangle>(triangle: O, point: Point, angle: number): O;

    /**
     * Rotates an entire Triangle at a given angle about a specific point.
     * @param triangle The Triangle to rotate.
     * @param x The X coordinate of the point to rotate the Triangle about.
     * @param y The Y coordinate of the point to rotate the Triangle about.
     * @param angle The angle by which to rotate the Triangle, in radians.
     */
    static RotateAroundXY<O extends Triangle>(triangle: O, x: number, y: number, angle: number): O;

    /**
     * The geometry constant type of this object: `GEOM_CONST.TRIANGLE`.
     * Used for fast type comparisons.
     */
    readonly type: number;

    /**
     * `x` coordinate of the first point.
     */
    x1: number;

    /**
     * `y` coordinate of the first point.
     */
    y1: number;

    /**
     * `x` coordinate of the second point.
     */
    x2: number;

    /**
     * `y` coordinate of the second point.
     */
    y2: number;

    /**
     * `x` coordinate of the third point.
     */
    x3: number;

    /**
     * `y` coordinate of the third point.
     */
    y3: number;

    /**
     * Checks whether a given points lies within the triangle.
     * @param x The x coordinate of the point to check.
     * @param y The y coordinate of the point to check.
     */
    contains(x: number, y: number): boolean;

    /**
     * Returns a specific point  on the triangle.
     * @param position Position as float within `0` and `1`. `0` equals the first point.
     * @param output Optional Point, or point-like object, that the calculated point will be written to.
     */
    getPoint<O extends Point>(position: number, output?: O): O;

    /**
     * Calculates a list of evenly distributed points on the triangle. It is either possible to pass an amount of points to be generated (`quantity`) or the distance between two points (`stepRate`).
     * @param quantity Number of points to be generated. Can be falsey when `stepRate` should be used. All points have the same distance along the triangle.
     * @param stepRate Distance between two points. Will only be used when `quantity` is falsey.
     * @param output Optional Array for writing the calculated points into. Otherwise a new array will be created.
     */
    getPoints<O extends Point[]>(quantity: number, stepRate?: number, output?: O): O;

    /**
     * Returns a random point along the triangle.
     * @param point Optional `Point` that should be modified. Otherwise a new one will be created.
     */
    getRandomPoint<O extends Point>(point?: O): O;

    /**
     * Sets all three points of the triangle. Leaving out any coordinate sets it to be `0`.
     * @param x1 `x` coordinate of the first point. Default 0.
     * @param y1 `y` coordinate of the first point. Default 0.
     * @param x2 `x` coordinate of the second point. Default 0.
     * @param y2 `y` coordinate of the second point. Default 0.
     * @param x3 `x` coordinate of the third point. Default 0.
     * @param y3 `y` coordinate of the third point. Default 0.
     */
    setTo(x1?: number, y1?: number, x2?: number, y2?: number, x3?: number, y3?: number): this;

    /**
     * Returns a Line object that corresponds to Line A of this Triangle.
     * @param line A Line object to set the results in. If `undefined` a new Line will be created.
     */
    getLineA(line?: Line): Line;

    /**
     * Returns a Line object that corresponds to Line B of this Triangle.
     * @param line A Line object to set the results in. If `undefined` a new Line will be created.
     */
    getLineB(line?: Line): Line;

    /**
     * Returns a Line object that corresponds to Line C of this Triangle.
     * @param line A Line object to set the results in. If `undefined` a new Line will be created.
     */
    getLineC(line?: Line): Line;

    /**
     * Left most X coordinate of the triangle. Setting it moves the triangle on the X axis accordingly.
     */
    left: number;

    /**
     * Right most X coordinate of the triangle. Setting it moves the triangle on the X axis accordingly.
     */
    right: number;

    /**
     * Top most Y coordinate of the triangle. Setting it moves the triangle on the Y axis accordingly.
     */
    top: number;

    /**
     * Bottom most Y coordinate of the triangle. Setting it moves the triangle on the Y axis accordingly.
     */
    bottom: number;

}

export default Triangle;