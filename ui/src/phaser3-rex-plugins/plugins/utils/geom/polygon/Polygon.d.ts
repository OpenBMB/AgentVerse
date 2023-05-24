import Point from '../point/Point';
import Rectangle from '../rectangle/Rectangle';
import { Vector2Like } from '../types';

/**
 * A Polygon object
 * 
 * The polygon is a closed shape consists of a series of connected straight lines defined by list of ordered points.
 * Several formats are supported to define the list of points, check the setTo method for details.
 * This is a geometry object allowing you to define and inspect the shape.
 * It is not a Game Object, in that you cannot add it to the display list, and it has no texture.
 * To render a Polygon you should look at the capabilities of the Graphics class.
 */
declare class Polygon {
    /**
     * 
     * @param points List of points defining the perimeter of this Polygon. Several formats are supported:
     * - A string containing paired x y values separated by a single space: `'40 0 40 20 100 20 100 80 40 80 40 100 0 50'`
     * - An array of Point objects: `[new Point(x1, y1), ...]`
     * - An array of objects with public x y properties: `[obj1, obj2, ...]`
     * - An array of paired numbers that represent point coordinates: `[x1,y1, x2,y2, ...]`
     * - An array of arrays with two elements representing x/y coordinates: `[[x1, y1], [x2, y2], ...]`
     */
    constructor(points?: string | number[] | Vector2Like[]);

    /**
     * Create a new polygon which is a copy of the specified polygon
     * @param polygon The polygon to create a clone of
     */
    static Clone(polygon: Polygon): Polygon;

    /**
     * Checks if a point is within the bounds of a Polygon.
     * @param polygon The Polygon to check against.
     * @param x The X coordinate of the point to check.
     * @param y The Y coordinate of the point to check.
     */
    static Contains(polygon: Polygon, x: number, y: number): boolean;

    /**
     * Checks the given Point again the Polygon to see if the Point lays within its vertices.
     * @param polygon The Polygon to check.
     * @param point The Point to check if it's within the Polygon.
     */
    static ContainsPoint(polygon: Polygon, point: Point): boolean;

    /**
     * This module implements a modified ear slicing algorithm, optimized by z-order curve hashing and extended to
     * handle holes, twisted polygons, degeneracies and self-intersections in a way that doesn't guarantee correctness
     * of triangulation, but attempts to always produce acceptable results for practical data.
     * 
     * Example:
     * 
     * ```javascript
     * const triangles = Polygon.Earcut([10,0, 0,50, 60,60, 70,10]); // returns [1,0,3, 3,2,1]
     * ```
     * 
     * Each group of three vertex indices in the resulting array forms a triangle.
     * 
     * ```javascript
     * // triangulating a polygon with a hole
     * earcut([0,0, 100,0, 100,100, 0,100,  20,20, 80,20, 80,80, 20,80], [4]);
     * // [3,0,4, 5,4,0, 3,4,7, 5,0,1, 2,3,7, 6,5,1, 2,7,6, 6,1,2]
     * 
     * // triangulating a polygon with 3d coords
     * earcut([10,0,1, 0,50,2, 60,60,3, 70,10,4], null, 3);
     * // [1,0,3, 3,2,1]
     * ```
     * 
     * If you pass a single vertex as a hole, Earcut treats it as a Steiner point.
     * 
     * If your input is a multi-dimensional array (e.g. GeoJSON Polygon), you can convert it to the format
     * expected by Earcut with `Polygon.Earcut.flatten`:
     * 
     * ```javascript
     * var data = earcut.flatten(geojson.geometry.coordinates);
     * var triangles = earcut(data.vertices, data.holes, data.dimensions);
     * ```
     * 
     * After getting a triangulation, you can verify its correctness with `Polygon.Earcut.deviation`:
     * 
     * ```javascript
     * var deviation = earcut.deviation(vertices, holes, dimensions, triangles);
     * ```
     * Returns the relative difference between the total area of triangles and the area of the input polygon.
     * 0 means the triangulation is fully correct.
     * 
     * For more information see https://github.com/mapbox/earcut
     * @param data A flat array of vertex coordinate, like [x0,y0, x1,y1, x2,y2, ...]
     * @param holeIndices An array of hole indices if any (e.g. [5, 8] for a 12-vertex input would mean one hole with vertices 5–7 and another with 8–11).
     * @param dimensions The number of coordinates per vertex in the input array (2 by default). Default 2.
     */
    static Earcut(data: number[], holeIndices?: number[], dimensions?: number): number[];

    /**
     * Calculates the bounding AABB rectangle of a polygon.
     * @param polygon The polygon that should be calculated.
     * @param out The rectangle or object that has x, y, width, and height properties to store the result. Optional.
     */
    static GetAABB<O extends Rectangle>(polygon: Polygon, out?: O): O;

    /**
     * Stores all of the points of a Polygon into a flat array of numbers following the sequence [ x,y, x,y, x,y ],
     * i.e. each point of the Polygon, in the order it's defined, corresponds to two elements of the resultant
     * array for the point's X and Y coordinate.
     * @param polygon The Polygon whose points to export.
     * @param output An array to which the points' coordinates should be appended.
     */
    static GetNumberArray<O extends number[]>(polygon: Polygon, output?: O): O;

    /**
     * Returns an array of Point objects containing the coordinates of the points around the perimeter of the Polygon,
     * based on the given quantity or stepRate values.
     * @param polygon The Polygon to get the points from.
     * @param quantity The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
     * @param stepRate Sets the quantity by getting the perimeter of the Polygon and dividing it by the stepRate.
     * @param output An array to insert the points in to. If not provided a new array will be created.
     */
    static GetPoints(polygon: Polygon, quantity: number, stepRate?: number, output?: any[]): Point[];

    /**
     * Returns the perimeter of the given Polygon.
     * @param polygon The Polygon to get the perimeter of.
     */
    static Perimeter(polygon: Polygon): number;

    /**
     * The geometry constant type of this object: `GEOM_CONST.POLYGON`.
     * Used for fast type comparisons.
     */
    readonly type: number;

    /**
     * The area of this Polygon.
     */
    area: number;

    /**
     * An array of number pair objects that make up this polygon. I.e. [ {x,y}, {x,y}, {x,y} ]
     */
    points: Point[];

    /**
     * Check to see if the Polygon contains the given x / y coordinates.
     * @param x The x coordinate to check within the polygon.
     * @param y The y coordinate to check within the polygon.
     */
    contains(x: number, y: number): boolean;

    /**
     * Sets this Polygon to the given points.
     * 
     * The points can be set from a variety of formats:
     * 
     * - A string containing paired values separated by a single space: `'40 0 40 20 100 20 100 80 40 80 40 100 0 50'`
     * - An array of Point objects: `[new Point(x1, y1), ...]`
     * - An array of objects with public x/y properties: `[obj1, obj2, ...]`
     * - An array of paired numbers that represent point coordinates: `[x1,y1, x2,y2, ...]`
     * - An array of arrays with two elements representing x/y coordinates: `[[x1, y1], [x2, y2], ...]`
     * 
     * `setTo` may also be called without any arguments to remove all points.
     * @param points Points defining the perimeter of this polygon. Please check function description above for the different supported formats.
     */
    setTo(points?: string | number[] | Vector2Like[]): this;

    /**
     * Calculates the area of the Polygon. This is available in the property Polygon.area
     */
    calculateArea(): number;

    /**
     * Returns an array of Point objects containing the coordinates of the points around the perimeter of the Polygon,
     * based on the given quantity or stepRate values.
     * @param quantity The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
     * @param stepRate Sets the quantity by getting the perimeter of the Polygon and dividing it by the stepRate.
     * @param output An array to insert the points in to. If not provided a new array will be created.
     */
    getPoints<O extends Point[]>(quantity: number, stepRate?: number, output?: O): O;

    /**
     * Reverses the order of the points of a Polygon.
     * @param polygon The Polygon to modify.
     */
    static Reverse<O extends Polygon>(polygon: O): O;

    /**
     * Takes a Polygon object and simplifies the points by running them through a combination of
     * Douglas-Peucker and Radial Distance algorithms. Simplification dramatically reduces the number of
     * points in a polygon while retaining its shape, giving a huge performance boost when processing
     * it and also reducing visual noise.
     * @param polygon The polygon to be simplified. The polygon will be modified in-place and returned.
     * @param tolerance Affects the amount of simplification (in the same metric as the point coordinates). Default 1.
     * @param highestQuality Excludes distance-based preprocessing step which leads to highest quality simplification but runs ~10-20 times slower. Default false.
     */
    static Simplify<O extends Polygon>(polygon: O, tolerance?: number, highestQuality?: boolean): O;

    /**
     * Takes a Polygon object and applies Chaikin's smoothing algorithm on its points.
     * @param polygon The polygon to be smoothed. The polygon will be modified in-place and returned.
     */
    static Smooth<O extends Polygon>(polygon: O): O;

    /**
     * Tranlates the points of the given Polygon.
     * @param polygon The Polygon to modify.
     * @param x The amount to horizontally translate the points by.
     * @param y The amount to vertically translate the points by.
     */
    static Translate<O extends Polygon>(polygon: O, x: number, y: number): O;

}

export default Polygon;