import Point from '../point/Point';
import { Vector2Like, Vector2 } from '../types';

/**
 * Defines a Line segment, a part of a line between two endpoints.
 */
declare class Line {
    /**
     * 
     * @param x1 The x coordinate of the lines starting point. Default 0.
     * @param y1 The y coordinate of the lines starting point. Default 0.
     * @param x2 The x coordinate of the lines ending point. Default 0.
     * @param y2 The y coordinate of the lines ending point. Default 0.
     */
    constructor(x1?: number, y1?: number, x2?: number, y2?: number);

    /**
     * Calculate the angle of the line in radians.
     * @param line The line to calculate the angle of.
     */
    static Angle(line: Line): number;

    /**
     * Using Bresenham's line algorithm this will return an array of all coordinates on this line.
     * 
     * The `start` and `end` points are rounded before this runs as the algorithm works on integers.
     * @param line The line.
     * @param stepRate The optional step rate for the points on the line. Default 1.
     * @param results An optional array to push the resulting coordinates into.
     */
    static BresenhamPoints(line: Line, stepRate?: number, results?: Vector2Like[]): Vector2Like[];

    /**
     * Center a line on the given coordinates.
     * @param line The line to center.
     * @param x The horizontal coordinate to center the line on.
     * @param y The vertical coordinate to center the line on.
     */
    static CenterOn(line: Line, x: number, y: number): Line;

    /**
     * Clone the given line.
     * @param source The source line to clone.
     */
    static Clone(source: Line): Line;

    /**
     * Copy the values of one line to a destination line.
     * @param source The source line to copy the values from.
     * @param dest The destination line to copy the values to.
     */
    static CopyFrom<O extends Line>(source: Line, dest: O): O;

    /**
     * Compare two lines for strict equality.
     * @param line The first line to compare.
     * @param toCompare The second line to compare.
     */
    static Equals(line: Line, toCompare: Line): boolean;

    /**
     * Extends the start and end points of a Line by the given amounts.
     * 
     * The amounts can be positive or negative. Positive points will increase the length of the line,
     * while negative ones will decrease it.
     * 
     * If no `right` value is provided it will extend the length of the line equally in both directions.
     * 
     * Pass a value of zero to leave the start or end point unchanged.
     * @param line The line instance to extend.
     * @param left The amount to extend the start of the line by.
     * @param right The amount to extend the end of the line by. If not given it will be set to the `left` value.
     */
    static Extend(line: Line, left: number, right?: number): Line;

    /**
     * Returns an array of `quantity` Points where each point is taken from the given Line,
     * spaced out according to the ease function specified.
     * 
     * ```javascript
     * const line = new Line(100, 300, 700, 300);
     * const points = Line.GetEasedPoints(line, 'sine.out', 32)
     * ```
     * 
     * In the above example, the `points` array will contain 32 points spread-out across
     * the length of `line`, where the position of each point is determined by the `Sine.out`
     * ease function.
     * 
     * You can optionally provide a collinear threshold. In this case, the resulting points
     * are checked against each other, and if they are `< collinearThreshold` distance apart,
     * they are dropped from the results. This can help avoid lots of clustered points at
     * far ends of the line with tightly-packed eases such as Quartic. Leave the value set
     * to zero to skip this check.
     * 
     * Note that if you provide a collinear threshold, the resulting array may not always
     * contain `quantity` points.
     * @param line The Line object.
     * @param ease The ease to use. This can be either a string from the EaseMap, or a custom function.
     * @param quantity The number of points to return. Note that if you provide a `collinearThreshold`, the resulting array may not always contain this number of points.
     * @param collinearThreshold An optional threshold. The final array is reduced so that each point is spaced out at least this distance apart. This helps reduce clustering in noisey eases. Default 0.
     * @param easeParams An optional array of ease parameters to go with the ease.
     */
    static GetEasedPoints<O extends Point[]>(line: Line, ease: string | Function, quantity: number, collinearThreshold?: number, easeParams?: number[]): O;

    /**
     * Get the midpoint of the given line.
     * @param line The line to get the midpoint of.
     * @param out An optional point object to store the midpoint in.
     */
    static GetMidPoint<O extends Point>(line: Line, out?: O): O;

    /**
     * Get the nearest point on a line perpendicular to the given point.
     * @param line The line to get the nearest point on.
     * @param point The point to get the nearest point to.
     * @param out An optional point, or point-like object, to store the coordinates of the nearest point on the line.
     */
    static GetNearestPoint<O extends Point>(line: Line, point: Point | object, out?: O): O;

    /**
     * Calculate the normal of the given line.
     * 
     * The normal of a line is a vector that points perpendicular from it.
     * @param line The line to calculate the normal of.
     * @param out An optional point object to store the normal in.
     */
    static GetNormal<O extends Point>(line: Line, out?: O): O;

    /**
     * Get a point on a line that's a given percentage along its length.
     * @param line The line.
     * @param position A value between 0 and 1, where 0 is the start, 0.5 is the middle and 1 is the end of the line.
     * @param out An optional point, or point-like object, to store the coordinates of the point on the line.
     */
    static GetPoint<O extends Point>(line: Line, position: number, out?: O): O;

    /**
     * Get a number of points along a line's length.
     * 
     * Provide a `quantity` to get an exact number of points along the line.
     * 
     * Provide a `stepRate` to ensure a specific distance between each point on the line. Set `quantity` to `0` when
     * providing a `stepRate`.
     * @param line The line.
     * @param quantity The number of points to place on the line. Set to `0` to use `stepRate` instead.
     * @param stepRate The distance between each point on the line. When set, `quantity` is implied and should be set to `0`.
     * @param out An optional array of Points, or point-like objects, to store the coordinates of the points on the line.
     */
    static GetPoints<O extends Point[]>(line: Line, quantity: number, stepRate?: number, out?: O): O;

    /**
     * Get the shortest distance from a Line to the given Point.
     * @param line The line to get the distance from.
     * @param point The point to get the shortest distance to.
     */
    static GetShortestDistance<O extends Point>(line: Line, point: Point | object): O;

    /**
     * Calculate the height of the given line.
     * @param line The line to calculate the height of.
     */
    static Height(line: Line): number;

    /**
     * Calculate the length of the given line.
     * @param line The line to calculate the length of.
     */
    static Length(line: Line): number;

    /**
     * The geometry constant type of this object: `GEOM_CONST.LINE`.
     * Used for fast type comparisons.
     */
    readonly type: number;

    /**
     * The x coordinate of the lines starting point.
     */
    x1: number;

    /**
     * The y coordinate of the lines starting point.
     */
    y1: number;

    /**
     * The x coordinate of the lines ending point.
     */
    x2: number;

    /**
     * The y coordinate of the lines ending point.
     */
    y2: number;

    /**
     * Get a point on a line that's a given percentage along its length.
     * @param position A value between 0 and 1, where 0 is the start, 0.5 is the middle and 1 is the end of the line.
     * @param output An optional point, or point-like object, to store the coordinates of the point on the line.
     */
    getPoint<O extends Point>(position: number, output?: O): O;

    /**
     * Get a number of points along a line's length.
     * 
     * Provide a `quantity` to get an exact number of points along the line.
     * 
     * Provide a `stepRate` to ensure a specific distance between each point on the line. Set `quantity` to `0` when
     * providing a `stepRate`.
     * @param quantity The number of points to place on the line. Set to `0` to use `stepRate` instead.
     * @param stepRate The distance between each point on the line. When set, `quantity` is implied and should be set to `0`.
     * @param output An optional array of Points, or point-like objects, to store the coordinates of the points on the line.
     */
    getPoints<O extends Point[]>(quantity: number, stepRate?: number, output?: O): O;

    /**
     * Get a random Point on the Line.
     * @param point An instance of a Point to be modified.
     */
    getRandomPoint<O extends Point>(point?: O): O;

    /**
     * Set new coordinates for the line endpoints.
     * @param x1 The x coordinate of the lines starting point. Default 0.
     * @param y1 The y coordinate of the lines starting point. Default 0.
     * @param x2 The x coordinate of the lines ending point. Default 0.
     * @param y2 The y coordinate of the lines ending point. Default 0.
     */
    setTo(x1?: number, y1?: number, x2?: number, y2?: number): this;

    /**
     * Returns a Vector2 object that corresponds to the start of this Line.
     * @param vec2 A Vector2 object to set the results in. If `undefined` a new Vector2 will be created.
     */
    getPointA(vec2?: Vector2): Vector2;

    /**
     * Returns a Vector2 object that corresponds to the end of this Line.
     * @param vec2 A Vector2 object to set the results in. If `undefined` a new Vector2 will be created.
     */
    getPointB(vec2?: Vector2): Vector2;

    /**
     * The left position of the Line.
     */
    left: number;

    /**
     * The right position of the Line.
     */
    right: number;

    /**
     * The top position of the Line.
     */
    top: number;

    /**
     * The bottom position of the Line.
     */
    bottom: number;

    /**
     * Get the angle of the normal of the given line in radians.
     * @param line The line to calculate the angle of the normal of.
     */
    static NormalAngle(line: Line): number;

    /**
     * Returns the x component of the normal vector of the given line.
     * @param line The Line object to get the normal value from.
     */
    static NormalX(line: Line): number;

    /**
     * The Y value of the normal of the given line.
     * The normal of a line is a vector that points perpendicular from it.
     * @param line The line to calculate the normal of.
     */
    static NormalY(line: Line): number;

    /**
     * Offset a line by the given amount.
     * @param line The line to offset.
     * @param x The horizontal offset to add to the line.
     * @param y The vertical offset to add to the line.
     */
    static Offset<O extends Line>(line: O, x: number, y: number): O;

    /**
     * Calculate the perpendicular slope of the given line.
     * @param line The line to calculate the perpendicular slope of.
     */
    static PerpSlope(line: Line): number;

    /**
     * Returns a random point on a given Line.
     * @param line The Line to calculate the random Point on.
     * @param out An instance of a Point to be modified.
     */
    static Random<O extends Point>(line: Line, out?: O): O;

    /**
     * Calculate the reflected angle between two lines.
     * 
     * This is the outgoing angle based on the angle of Line 1 and the normalAngle of Line 2.
     * @param lineA The first line.
     * @param lineB The second line.
     */
    static ReflectAngle(lineA: Line, lineB: Line): number;

    /**
     * Rotate a line around its midpoint by the given angle in radians.
     * @param line The line to rotate.
     * @param angle The angle of rotation in radians.
     */
    static Rotate<O extends Line>(line: O, angle: number): O;

    /**
     * Rotate a line around a point by the given angle in radians.
     * @param line The line to rotate.
     * @param point The point to rotate the line around.
     * @param angle The angle of rotation in radians.
     */
    static RotateAroundPoint<O extends Line>(line: O, point: Point | object, angle: number): O;

    /**
     * Rotate a line around the given coordinates by the given angle in radians.
     * @param line The line to rotate.
     * @param x The horizontal coordinate to rotate the line around.
     * @param y The vertical coordinate to rotate the line around.
     * @param angle The angle of rotation in radians.
     */
    static RotateAroundXY<O extends Line>(line: O, x: number, y: number, angle: number): O;

    /**
     * Set a line to a given position, angle and length.
     * @param line The line to set.
     * @param x The horizontal start position of the line.
     * @param y The vertical start position of the line.
     * @param angle The angle of the line in radians.
     * @param length The length of the line.
     */
    static SetToAngle<O extends Line>(line: O, x: number, y: number, angle: number, length: number): O;

    /**
     * Calculate the slope of the given line.
     * @param line The line to calculate the slope of.
     */
    static Slope(line: Line): number;

    /**
     * Calculate the width of the given line.
     * @param line The line to calculate the width of.
     */
    static Width(line: Line): number;

}

export default Line;