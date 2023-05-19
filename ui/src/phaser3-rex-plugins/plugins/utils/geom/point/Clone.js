/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2019 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Point from './Point.js';

/**
 * Clone the given Point.
 *
 * @function Phaser.Geom.Point.Clone
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Point} source - The source Point to clone.
 *
 * @return {Phaser.Geom.Point} The cloned Point.
 */
var Clone = function (source) {
    return new Point(source.x, source.y);
};

export default Clone;
