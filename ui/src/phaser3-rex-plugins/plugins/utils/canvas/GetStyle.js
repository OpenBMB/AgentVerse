const Pad = Phaser.Utils.String.Pad;
var GetStyle = function (style, canvas, context) {
    if (style == null) {
        return style;
    }

    switch (typeof (style)) {
        case 'string': return style;
        case 'number': return `#${Pad(Math.floor(style).toString(16), 6, '0', 1)}`;
        case 'function': return style(canvas, context);
        case 'object':
            if (style.hasOwnProperty('r')) {
                if (style.hasOwnProperty('a')) {  // rgba
                    return `rgba(${style.r},${style.g},${style.b},${style.a})`;
                } else {  // rgb
                    return `rgb(${style.r},${style.g},${style.b})`;
                }
            } else if (style.hasOwnProperty('h')) {
                if (style.hasOwnProperty('a')) {  // hsla
                    return `hsla(${style.h},${style.s},${style.l},${style.a})`;
                } else {  // hsl
                    return `hsl(${style.h},${style.s},${style.l})`;
                }
            } else {
                return style; // Not a valid input
            }
        default: return style;
    }
}

export default GetStyle;