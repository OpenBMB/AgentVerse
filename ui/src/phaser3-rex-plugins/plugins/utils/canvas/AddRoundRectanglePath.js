import RoundRectangle from '../../geom/roundrectangle/RoundRectangle.js';

const DegToRad = Phaser.Math.DegToRad;

var AddRoundRectanglePath = function (context, x, y, width, height, radiusConfig, iteration) {
    var geom = new RoundRectangle(x, y, width, height, radiusConfig),
        minWidth = geom.minWidth,
        minHeight = geom.minHeight,
        scaleRX = (width >= minWidth) ? 1 : (width / minWidth),
        scaleRY = (height >= minHeight) ? 1 : (height / minHeight);

    var cornerRadius = geom.cornerRadius;
    var radius, radiusX, radiusY, centerX, centerY;

    context.save();
    context.beginPath();

    context.translate(x, y);

    // Top-left
    radius = cornerRadius.tl;
    if (IsArcCorner(radius)) {
        radiusX = radius.x * scaleRX;
        radiusY = radius.y * scaleRY;
        if (IsConvexArc(radius)) {
            centerX = radiusX;
            centerY = radiusY;
            ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 270, false, iteration);
        } else {
            centerX = 0;
            centerY = 0;
            ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 0, true, iteration);
        }
    } else {
        context.lineTo(0, 0);
    }

    // Top-right
    radius = cornerRadius.tr;
    if (IsArcCorner(radius)) {
        radiusX = radius.x * scaleRX;
        radiusY = radius.y * scaleRY;
        if (IsConvexArc(radius)) {
            centerX = width - radiusX;
            centerY = radiusY;
            ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 360, false, iteration);
        } else {
            centerX = width;
            centerY = 0;
            ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 90, true, iteration);
        }
    } else {
        context.lineTo(width, 0);
    }

    // Bottom-right
    radius = cornerRadius.br;
    if (IsArcCorner(radius)) {
        radiusX = radius.x * scaleRX;
        radiusY = radius.y * scaleRY;
        if (IsConvexArc(radius)) {
            centerX = width - radiusX;
            centerY = height - radiusY;
            ArcTo(context, centerX, centerY, radiusX, radiusY, 0, 90, false, iteration);
        } else {
            centerX = width;
            centerY = height;
            ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 180, true, iteration);
        }
    } else {
        context.lineTo(width, height);
    }

    // Bottom-left
    radius = cornerRadius.bl;
    if (IsArcCorner(radius)) {
        radiusX = radius.x * scaleRX;
        radiusY = radius.y * scaleRY;
        if (IsConvexArc(radius)) {
            centerX = radiusX;
            centerY = height - radiusY;
            ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 180, false, iteration);
        } else {
            centerX = 0;
            centerY = height;
            ArcTo(context, centerX, centerY, radiusX, radiusY, 360, 270, true, iteration);
        }
    } else {
        context.lineTo(0, height);
    }

    context.closePath();
    context.restore();
}

var IsConvexArc = function (radius) {
    return (!radius.hasOwnProperty('convex')) ||  // radius does not have convex property
        radius.convex;
}

var IsArcCorner = function (radius) {
    return ((radius.x > 0) && (radius.y > 0));
}

var ArcTo = function (
    context,
    centerX, centerY,
    radiusX, radiusY,
    startAngle, endAngle,
    antiClockWise,
    iteration
) {

    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise && (endAngle > startAngle)) {
        endAngle -= 360;
    } else if (!antiClockWise && (endAngle < startAngle)) {
        endAngle += 360;
    }

    startAngle = DegToRad(startAngle);
    endAngle = DegToRad(endAngle);

    if (iteration == null) {  // undefined, or null
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, startAngle, endAngle, antiClockWise);
    } else {
        iteration += 1;
        var x, y, angle;
        var step = (endAngle - startAngle) / iteration;
        for (var i = 0; i <= iteration; i++) {
            angle = startAngle + (step * i);
            x = centerX + (radiusX * Math.cos(angle));
            y = centerY + (radiusY * Math.sin(angle));
            context.lineTo(x, y);
        }
    }
}

export default AddRoundRectanglePath;