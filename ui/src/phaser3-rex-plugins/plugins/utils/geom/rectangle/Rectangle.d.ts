import Point from '../point/Point';
import Line from '../line/Line';

/**
 * Encapsulates a 2D rectangle defined by its corner point in the top-left and its extends in x (width) and y (height)
 */
declare class Rectangle {
    /**
     * 
     * @param x The X coordinate of the top left corner of the Rectangle. Default 0.
     * @param y The Y coordinate of the top left corner of the Rectangle. Default 0.
     * @param width The width of the Rectangle. Default 0.
     * @param height The height of the Rectangle. Default 0.
     */
    constructor(x?: number, y?: number, width?: number, height?: number);

    /**
     * Calculates the area of the given Rectangle object.
     * @param rect The rectangle to calculate the area of.
     */
    static Area(rect: Rectangle): number;

    /**
     * Rounds a Rectangle's position up to the smallest integer greater than or equal to each current coordinate.
     * @param rect The Rectangle to adjust.
     */
    static Ceil<O extends Rectangle>(rect: O): O;

    /**
     * Rounds a Rectangle's position and size up to the smallest integer greater than or equal to each respective value.
     * @param rect The Rectangle to modify.
     */
    static CeilAll<O extends Rectangle>(rect: O): O;

    /**
     * Moves the top-left corner of a Rectangle so that its center is at the given coordinates.
     * @param rect The Rectangle to be centered.
     * @param x The X coordinate of the Rectangle's center.
     * @param y The Y coordinate of the Rectangle's center.
     */
    static CenterOn<O extends Rectangle>(rect: O, x: number, y: number): O;

    /**
     * Creates a new Rectangle which is identical to the given one.
     * @param source The Rectangle to clone.
     */
    static Clone(source: Rectangle): Rectangle;

    /**
     * Checks if a given point is inside a Rectangle's bounds.
     * @param rect The Rectangle to check.
     * @param x The X coordinate of the point to check.
     * @param y The Y coordinate of the point to check.
     */
    static Contains(rect: Rectangle, x: number, y: number): boolean;

    /**
     * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
     * @param rect The Rectangle object.
     * @param point The point object to be checked. Can be a Point object or any object with x and y values.
     */
    static ContainsPoint(rect: Rectangle, point: Point): boolean;

    /**
     * Tests if one rectangle fully contains another.
     * @param rectA The first rectangle.
     * @param rectB The second rectangle.
     */
    static ContainsRect(rectA: Rectangle, rectB: Rectangle): boolean;

    /**
     * Copy the values of one Rectangle to a destination Rectangle.
     * @param source The source Rectangle to copy the values from.
     * @param dest The destination Rectangle to copy the values to.
     */
    static CopyFrom<O extends Rectangle>(source: Rectangle, dest: O): O;

    /**
     * Create an array of points for each corner of a Rectangle
     * If an array is specified, each point object will be added to the end of the array, otherwise a new array will be created.
     * @param rect The Rectangle object to be decomposed.
     * @param out If provided, each point will be added to this array.
     */
    static Decompose(rect: Rectangle, out?: any[]): any[];

    /**
     * Compares the `x`, `y`, `width` and `height` properties of two rectangles.
     * @param rect Rectangle A
     * @param toCompare Rectangle B
     */
    static Equals(rect: Rectangle, toCompare: Rectangle): boolean;

    /**
     * Adjusts the target rectangle, changing its width, height and position,
     * so that it fits inside the area of the source rectangle, while maintaining its original
     * aspect ratio.
     * 
     * Unlike the `FitOutside` function, there may be some space inside the source area not covered.
     * @param target The target rectangle to adjust.
     * @param source The source rectangle to envelop the target in.
     */
    static FitInside<O extends Rectangle>(target: O, source: Rectangle): O;

    /**
     * Adjusts the target rectangle, changing its width, height and position,
     * so that it fully covers the area of the source rectangle, while maintaining its original
     * aspect ratio.
     * 
     * Unlike the `FitInside` function, the target rectangle may extend further out than the source.
     * @param target The target rectangle to adjust.
     * @param source The source rectangle to envelope the target in.
     */
    static FitOutside<O extends Rectangle>(target: O, source: Rectangle): O;

    /**
     * Rounds down (floors) the top left X and Y coordinates of the given Rectangle to the largest integer less than or equal to them
     * @param rect The rectangle to floor the top left X and Y coordinates of
     */
    static Floor<O extends Rectangle>(rect: O): O;

    /**
     * Rounds a Rectangle's position and size down to the largest integer less than or equal to each current coordinate or dimension.
     * @param rect The Rectangle to adjust.
     */
    static FloorAll<O extends Rectangle>(rect: O): O;

    /**
     * Constructs new Rectangle or repositions and resizes an existing Rectangle so that all of the given points are on or within its bounds.
     * @param points An array of points (either arrays with two elements corresponding to the X and Y coordinate or an object with public `x` and `y` properties) which should be surrounded by the Rectangle.
     * @param out Optional Rectangle to adjust.
     */
    static FromPoints<O extends Rectangle>(points: any[], out?: O): O;

    /**
     * Create the smallest Rectangle containing two coordinate pairs.
     * @param x1 The X coordinate of the first point.
     * @param y1 The Y coordinate of the first point.
     * @param x2 The X coordinate of the second point.
     * @param y2 The Y coordinate of the second point.
     * @param out Optional Rectangle to adjust.
     */
    static FromXY<O extends Rectangle>(x1: number, y1: number, x2: number, y2: number, out?: O): O;

    /**
     * Calculates the width/height ratio of a rectangle.
     * @param rect The rectangle.
     */
    static GetAspectRatio(rect: Rectangle): number;

    /**
     * Returns the center of a Rectangle as a Point.
     * @param rect The Rectangle to get the center of.
     * @param out Optional point-like object to update with the center coordinates.
     */
    static GetCenter<O extends Point>(rect: Rectangle, out?: O): O;

    /**
     * Calculates the coordinates of a point at a certain `position` on the Rectangle's perimeter.
     * 
     * The `position` is a fraction between 0 and 1 which defines how far into the perimeter the point is.
     * 
     * A value of 0 or 1 returns the point at the top left corner of the rectangle, while a value of 0.5 returns the point at the bottom right corner of the rectangle. Values between 0 and 0.5 are on the top or the right side and values between 0.5 and 1 are on the bottom or the left side.
     * @param rectangle The Rectangle to get the perimeter point from.
     * @param position The normalized distance into the Rectangle's perimeter to return.
     * @param out An object to update with the `x` and `y` coordinates of the point.
     */
    static GetPoint<O extends Point>(rectangle: Rectangle, position: number, out?: O): O;

    /**
     * Return an array of points from the perimeter of the rectangle, each spaced out based on the quantity or step required.
     * @param rectangle The Rectangle object to get the points from.
     * @param step Step between points. Used to calculate the number of points to return when quantity is falsey. Ignored if quantity is positive.
     * @param quantity The number of evenly spaced points from the rectangles perimeter to return. If falsey, step param will be used to calculate the number of points.
     * @param out An optional array to store the points in.
     */
    static GetPoints<O extends Point[]>(rectangle: Rectangle, step: number, quantity: number, out?: O): O;

    /**
     * Returns the size of the Rectangle, expressed as a Point object.
     * With the value of the `width` as the `x` property and the `height` as the `y` property.
     * @param rect The Rectangle to get the size from.
     * @param out The Point object to store the size in. If not given, a new Point instance is created.
     */
    static GetSize<O extends Point>(rect: Rectangle, out?: O): O;

    /**
     * Increases the size of a Rectangle by a specified amount.
     * 
     * The center of the Rectangle stays the same. The amounts are added to each side, so the actual increase in width or height is two times bigger than the respective argument.
     * @param rect The Rectangle to inflate.
     * @param x How many pixels the left and the right side should be moved by horizontally.
     * @param y How many pixels the top and the bottom side should be moved by vertically.
     */
    static Inflate<O extends Rectangle>(rect: O, x: number, y: number): O;

    /**
     * Takes two Rectangles and first checks to see if they intersect.
     * If they intersect it will return the area of intersection in the `out` Rectangle.
     * If they do not intersect, the `out` Rectangle will have a width and height of zero.
     * @param rectA The first Rectangle to get the intersection from.
     * @param rectB The second Rectangle to get the intersection from.
     * @param out A Rectangle to store the intersection results in.
     */
    static Intersection<O extends Rectangle>(rectA: Rectangle, rectB: Rectangle, out?: Rectangle): O;

    /**
     * Returns an array of points from the perimeter of the Rectangle, where each point is spaced out based
     * on either the `step` value, or the `quantity`.
     * @param rect The Rectangle to get the perimeter points from.
     * @param step The distance between each point of the perimeter. Set to `null` if you wish to use the `quantity` parameter instead.
     * @param quantity The total number of points to return. The step is then calculated based on the length of the Rectangle, divided by this value.
     * @param out An array in which the perimeter points will be stored. If not given, a new array instance is created.
     */
    static MarchingAnts<O extends Point[]>(rect: Rectangle, step?: number, quantity?: number, out?: O): O;

    /**
     * Merges a Rectangle with a list of points by repositioning and/or resizing it such that all points are located on or within its bounds.
     * @param target The Rectangle which should be merged.
     * @param points An array of Points (or any object with public `x` and `y` properties) which should be merged with the Rectangle.
     */
    static MergePoints<O extends Rectangle>(target: O, points: Point[]): O;

    /**
     * Merges the source rectangle into the target rectangle and returns the target.
     * Neither rectangle should have a negative width or height.
     * @param target Target rectangle. Will be modified to include source rectangle.
     * @param source Rectangle that will be merged into target rectangle.
     */
    static MergeRect<O extends Rectangle>(target: O, source: Rectangle): O;

    /**
     * Merges a Rectangle with a point by repositioning and/or resizing it so that the point is on or within its bounds.
     * @param target The Rectangle which should be merged and modified.
     * @param x The X coordinate of the point which should be merged.
     * @param y The Y coordinate of the point which should be merged.
     */
    static MergeXY<O extends Rectangle>(target: O, x: number, y: number): O;

    /**
     * Nudges (translates) the top left corner of a Rectangle by a given offset.
     * @param rect The Rectangle to adjust.
     * @param x The distance to move the Rectangle horizontally.
     * @param y The distance to move the Rectangle vertically.
     */
    static Offset<O extends Rectangle>(rect: O, x: number, y: number): O;

    /**
     * Nudges (translates) the top-left corner of a Rectangle by the coordinates of a point (translation vector).
     * @param rect The Rectangle to adjust.
     * @param point The point whose coordinates should be used as an offset.
     */
    static OffsetPoint<O extends Rectangle>(rect: O, point: Point): O;

    /**
     * Checks if two Rectangles overlap. If a Rectangle is within another Rectangle, the two will be considered overlapping. Thus, the Rectangles are treated as "solid".
     * @param rectA The first Rectangle to check.
     * @param rectB The second Rectangle to check.
     */
    static Overlaps(rectA: Rectangle, rectB: Rectangle): boolean;

    /**
     * Calculates the perimeter of a Rectangle.
     * @param rect The Rectangle to use.
     */
    static Perimeter(rect: Rectangle): number;

    /**
     * Returns a Point from the perimeter of a Rectangle based on the given angle.
     * @param rectangle The Rectangle to get the perimeter point from.
     * @param angle The angle of the point, in degrees.
     * @param out The Point object to store the position in. If not given, a new Point instance is created.
     */
    static PerimeterPoint<O extends Point>(rectangle: Rectangle, angle: number, out?: O): O;

    /**
     * Returns a random point within a Rectangle.
     * @param rect The Rectangle to return a point from.
     * @param out The object to update with the point's coordinates.
     */
    static Random<O extends Point>(rect: Rectangle, out: O): O;

    /**
     * Calculates a random point that lies within the `outer` Rectangle, but outside of the `inner` Rectangle.
     * The inner Rectangle must be fully contained within the outer rectangle.
     * @param outer The outer Rectangle to get the random point within.
     * @param inner The inner Rectangle to exclude from the returned point.
     * @param out A Point, or Point-like object to store the result in. If not specified, a new Point will be created.
     */
    static RandomOutside<O extends Point>(outer: Rectangle, inner: Rectangle, out?: O): O;

    /**
     * The geometry constant type of this object: `GEOM_CONST.RECTANGLE`.
     * Used for fast type comparisons.
     */
    readonly type: number;

    /**
     * The X coordinate of the top left corner of the Rectangle.
     */
    x: number;

    /**
     * The Y coordinate of the top left corner of the Rectangle.
     */
    y: number;

    /**
     * The width of the Rectangle, i.e. the distance between its left side (defined by `x`) and its right side.
     */
    width: number;

    /**
     * The height of the Rectangle, i.e. the distance between its top side (defined by `y`) and its bottom side.
     */
    height: number;

    /**
     * Checks if the given point is inside the Rectangle's bounds.
     * @param x The X coordinate of the point to check.
     * @param y The Y coordinate of the point to check.
     */
    contains(x: number, y: number): boolean;

    /**
     * Calculates the coordinates of a point at a certain `position` on the Rectangle's perimeter.
     * 
     * The `position` is a fraction between 0 and 1 which defines how far into the perimeter the point is.
     * 
     * A value of 0 or 1 returns the point at the top left corner of the rectangle, while a value of 0.5 returns the point at the bottom right corner of the rectangle. Values between 0 and 0.5 are on the top or the right side and values between 0.5 and 1 are on the bottom or the left side.
     * @param position The normalized distance into the Rectangle's perimeter to return.
     * @param output An object to update with the `x` and `y` coordinates of the point.
     */
    getPoint<O extends Point>(position: number, output?: O): O;

    /**
     * Returns an array of points from the perimeter of the Rectangle, each spaced out based on the quantity or step required.
     * @param quantity The number of points to return. Set to `false` or 0 to return an arbitrary number of points (`perimeter / stepRate`) evenly spaced around the Rectangle based on the `stepRate`.
     * @param stepRate If `quantity` is 0, determines the normalized distance between each returned point.
     * @param output An array to which to append the points.
     */
    getPoints<O extends Point[]>(quantity: number, stepRate?: number, output?: O): O;

    /**
     * Returns a random point within the Rectangle's bounds.
     * @param point The object in which to store the `x` and `y` coordinates of the point.
     */
    getRandomPoint<O extends Point>(point?: O): O;

    /**
     * Sets the position, width, and height of the Rectangle.
     * @param x The X coordinate of the top left corner of the Rectangle.
     * @param y The Y coordinate of the top left corner of the Rectangle.
     * @param width The width of the Rectangle.
     * @param height The height of the Rectangle.
     */
    setTo(x: number, y: number, width: number, height: number): this;

    /**
     * Resets the position, width, and height of the Rectangle to 0.
     */
    setEmpty(): this;

    /**
     * Sets the position of the Rectangle.
     * @param x The X coordinate of the top left corner of the Rectangle.
     * @param y The Y coordinate of the top left corner of the Rectangle. Default x.
     */
    setPosition(x: number, y?: number): this;

    /**
     * Sets the width and height of the Rectangle.
     * @param width The width to set the Rectangle to.
     * @param height The height to set the Rectangle to. Default width.
     */
    setSize(width: number, height?: number): this;

    /**
     * Determines if the Rectangle is empty. A Rectangle is empty if its width or height is less than or equal to 0.
     */
    isEmpty(): boolean;

    /**
     * Returns a Line object that corresponds to the top of this Rectangle.
     * @param line A Line object to set the results in. If `undefined` a new Line will be created.
     */
    getLineA<O extends Line>(line?: O): O;

    /**
     * Returns a Line object that corresponds to the right of this Rectangle.
     * @param line A Line object to set the results in. If `undefined` a new Line will be created.
     */
    getLineB<O extends Line>(line?: O): O;

    /**
     * Returns a Line object that corresponds to the bottom of this Rectangle.
     * @param line A Line object to set the results in. If `undefined` a new Line will be created.
     */
    getLineC<O extends Line>(line?: O): O;

    /**
     * Returns a Line object that corresponds to the left of this Rectangle.
     * @param line A Line object to set the results in. If `undefined` a new Line will be created.
     */
    getLineD<O extends Line>(line?: O): O;

    /**
     * The x coordinate of the left of the Rectangle.
     * Changing the left property of a Rectangle object has no effect on the y and height properties. However it does affect the width property, whereas changing the x value does not affect the width property.
     */
    left: number;

    /**
     * The sum of the x and width properties.
     * Changing the right property of a Rectangle object has no effect on the x, y and height properties, however it does affect the width property.
     */
    right: number;

    /**
     * The y coordinate of the top of the Rectangle. Changing the top property of a Rectangle object has no effect on the x and width properties.
     * However it does affect the height property, whereas changing the y value does not affect the height property.
     */
    top: number;

    /**
     * The sum of the y and height properties.
     * Changing the bottom property of a Rectangle object has no effect on the x, y and width properties, but does change the height property.
     */
    bottom: number;

    /**
     * The x coordinate of the center of the Rectangle.
     */
    centerX: number;

    /**
     * The y coordinate of the center of the Rectangle.
     */
    centerY: number;

    /**
     * Determines if the two objects (either Rectangles or Rectangle-like) have the same width and height values under strict equality.
     * @param rect The first Rectangle object.
     * @param toCompare The second Rectangle object.
     */
    static SameDimensions(rect: Rectangle, toCompare: Rectangle): boolean;

    /**
     * Scales the width and height of this Rectangle by the given amounts.
     * @param rect The `Rectangle` object that will be scaled by the specified amount(s).
     * @param x The factor by which to scale the rectangle horizontally.
     * @param y The amount by which to scale the rectangle vertically. If this is not specified, the rectangle will be scaled by the factor `x` in both directions.
     */
    static Scale<O extends Rectangle>(rect: O, x: number, y: number): O;

    /**
     * Creates a new Rectangle or repositions and/or resizes an existing Rectangle so that it encompasses the two given Rectangles, i.e. calculates their union.
     * @param rectA The first Rectangle to use.
     * @param rectB The second Rectangle to use.
     * @param out The Rectangle to store the union in.
     */
    static Union<O extends Rectangle>(rectA: Rectangle, rectB: Rectangle, out?: O): O;

}

export default Rectangle;