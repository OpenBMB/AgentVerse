const Linear = Phaser.Math.Linear;

var InterpolateColor32 = function (color0, color1, t) {
    var r0 = (color0 >> 16) & 0xff;
    var g0 = (color0 >> 8) & 0xff;
    var b0 = color0 & 0xff
    var a0 = (color0 >> 24) & 0xff

    var r1 = (color1 >> 16) & 0xff;
    var g1 = (color1 >> 8) & 0xff;
    var b1 = color1 & 0xff;
    var a1 = (color1 >> 24) & 0xff;

    var r = Linear(r0, r1, t);
    var g = Linear(g0, g1, t);
    var b = Linear(b0, b1, t);
    var a = Linear(a0, a1, t);

    return (a << 24) | (r << 16) | (g << 8) | b;
}

export default InterpolateColor32;