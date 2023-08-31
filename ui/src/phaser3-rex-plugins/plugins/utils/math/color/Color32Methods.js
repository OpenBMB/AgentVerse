import InterpolateColor32 from './InterpolateColor32.js';

const Color = Phaser.Display.Color;

export default {
    rgbaToColor32(r, g, b, a) {
        return (a << 24) | (r << 16) | (g << 8) | b;
    },

    color32ToColorInt(color32) {
        return color32 & 0xffffff;
    },

    color32ToAlpha(color32) {
        return color32 >>> 24;
    },

    color32ToColorObject(color32, out) {
        var r = (color32 >> 16) & 0xff;
        var g = (color32 >> 8) & 0xff;
        var b = color32 & 0xff
        var a = (color32 >> 24) & 0xff
        if (out === undefined) {
            out = new Color(r, b, g, a);
        } else {
            out.setTo(r, b, g, a);
        }
        return out;
    },

    interpolateColor32: InterpolateColor32,
}