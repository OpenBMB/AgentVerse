import PolarToCartesian from '../../utils/math/coordinate/PolarToCartesian.js';

var DegToRad = Phaser.Math.DegToRad;
var RadToDeg = Phaser.Math.RadToDeg;

var AddPolarCoordinateProperties = function (gameObject, ox, oy, rotation, radius) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('polarOX')) {
        return gameObject;
    }

    if (ox === undefined) {
        ox = 0;
    }
    if (oy === undefined) {
        oy = 0;
    }
    if (rotation === undefined) {
        rotation = 0;
    }
    if (radius === undefined) {
        radius = 0;
    }

    Object.defineProperty(gameObject, 'polarOX', {
        get: function () {
            return ox;
        },
        set: function (value) {
            if (ox !== value) {
                ox = value;
                PolarToCartesian(ox, oy, rotation, radius, gameObject);
            }
        },
    });

    Object.defineProperty(gameObject, 'polarOY', {
        get: function () {
            return oy;
        },
        set: function (value) {
            if (oy !== value) {
                oy = value;
                PolarToCartesian(ox, oy, rotation, radius, gameObject);
            }
        },
    });

    Object.defineProperty(gameObject, 'polarRotation', {
        get: function () {
            return rotation;
        },
        set: function (value) {
            if (rotation !== value) {
                rotation = value;
                PolarToCartesian(ox, oy, rotation, radius, gameObject);
            }
        },
    });
    Object.defineProperty(gameObject, 'polarAngle', {
        get: function () {
            return RadToDeg(rotation);
        },
        set: function (value) {
            this.polarRotation = DegToRad(value);
        },
    });

    Object.defineProperty(gameObject, 'polarRadius', {
        get: function () {
            return radius;
        },
        set: function (value) {
            if (radius !== value) {
                radius = value;
                PolarToCartesian(ox, oy, rotation, radius, gameObject);
            }
        },
    });

    PolarToCartesian(ox, oy, rotation, radius, gameObject);
}

export default AddPolarCoordinateProperties;