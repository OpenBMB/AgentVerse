/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2019 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Triangle from './Triangle.js';

/**
 * Clones a Triangle object.
 *
 * @function Phaser.Geom.Triangle.Clone
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Triangle} source - The Triangle to clone.
 *
 * @return {Phaser.Geom.Triangle} A new Triangle identical to the given one but separate from it.
 */
var Clone = function (source) {
    return new Triangle(source.x1, source.y1, source.x2, source.y2, source.x3, source.y3);
};

export default Clone;
