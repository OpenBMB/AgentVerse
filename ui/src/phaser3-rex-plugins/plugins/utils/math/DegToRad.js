/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

const DEG_TO_RAD = Math.PI / 180;

/**
 * Convert the given angle from degrees, to the equivalent angle in radians.
 *
 * @function Phaser.Math.DegToRad
 * @since 3.0.0
 *
 * @param {integer} degrees - The angle (in degrees) to convert to radians.
 *
 * @return {number} The given angle converted to radians.
 */
var DegToRad = function (degrees)
{
    return degrees * DEG_TO_RAD;
};

export default DegToRad;
