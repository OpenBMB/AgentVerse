import TextStyle from '../../textbase/textstyle/TextStyle.js';

var GETPROP_RESULT = {
    plainText: null,
    prevProp: null
};

var STYLE_RESULT = new TextStyle();

class Parser {
    constructor(tags) {
        if (tags === undefined) {
            tags = {};
        }
        this.tags = tags;
    }

    addTag(name, prop) {
        this.tags[name] = prop;
    }

    getTag(name) {
        return this.tags[name];
    }

    splitText(text, mode) {
        var result = [];
        var charIdx = 0;
        while (true) {
            var regexResult = RE_SPLITTEXT.exec(text);
            if (!regexResult) {
                break;
            }

            var match = regexResult[0];
            var matchStart = RE_SPLITTEXT.lastIndex - match.length;

            if (charIdx < matchStart) {
                result.push(text.substring(charIdx, matchStart));
            }
            if (mode === undefined) {
                result.push(match);
            } else if (mode === 1) { // RAWTEXTONLY_MODE
                if (RE_CLASS_HEADER.test(match)) {
                    var innerMatch = match.match(RE_CLASS);
                    result.push(innerMatch[2]);
                } else if (RE_STYLE_HEADER.test(match)) {
                    var innerMatch = match.match(RE_STYLE);
                    result.push(innerMatch[2]);
                }
            }

            charIdx = RE_SPLITTEXT.lastIndex;
        }

        var totalLen = text.length;
        if (charIdx < totalLen) {  // Push remainder string
            result.push(text.substring(charIdx, totalLen));
        }

        return result; // [text,...]         
    }

    tagTextToProp(text, prevProp) {
        var plainText, propOut;
        if (RE_CLASS_HEADER.test(text)) {
            var innerMatch = text.match(RE_CLASS);
            if (innerMatch != null) {
                var name = innerMatch[1];
                var tags = this.tags;
                if (tags.hasOwnProperty(name)) {
                    propOut = tags[name];
                } else {
                    propOut = {};
                }
                propOut._class = name;
                plainText = innerMatch[2];
            }
        } else if (RE_STYLE_HEADER.test(text)) {
            var innerMatch = text.match(RE_STYLE);
            if (innerMatch != null) {
                var style = innerMatch[1];
                propOut = StyleToProp(style);
                propOut._style = style;
                plainText = innerMatch[2];
            }
        }

        if (plainText == null) {
            plainText = text;
        }

        if (propOut == null) {
            propOut = {};
        }

        var result = GETPROP_RESULT;
        result.plainText = plainText;
        result.prop = propOut;
        return result;
    }

    propToContextStyle(defaultStyle, prop) {
        var result = STYLE_RESULT;
        if (!prop.hasOwnProperty('img')) {
            result.image = null;

            if (prop.hasOwnProperty('family') || prop.hasOwnProperty('fontFamily') || prop.hasOwnProperty('font-family')) {
                var family = (prop.hasOwnProperty('family')) ? prop.family :
                    (prop.hasOwnProperty('fontFamily')) ? prop.fontFamily :
                        prop['font-family'];
                result.fontFamily = family;
            } else {
                result.fontFamily = defaultStyle.fontFamily;
            }

            if (prop.hasOwnProperty('size') || prop.hasOwnProperty('fontSize') || prop.hasOwnProperty('font-size')) {
                var size = (prop.hasOwnProperty('size')) ? prop.size :
                    (prop.hasOwnProperty('fontSize')) ? prop.fontSize :
                        prop['font-size'];
                if (typeof (size) === 'number') {
                    size = `${size}px`;
                }
                result.fontSize = size;
            } else {
                result.fontSize = defaultStyle.fontSize;
            }

            if (prop.hasOwnProperty('style') || prop.hasOwnProperty('fontStyle') || prop.hasOwnProperty('font-style')) {
                var fontStyle = (prop.hasOwnProperty('style')) ? prop.style :
                    (prop.hasOwnProperty('fontStyle')) ? prop.fontStyle :
                        prop['font-style'];
                result.fontStyle = fontStyle;
            } else {
                result.fontStyle = defaultStyle.fontStyle;
            }

            if (prop.hasOwnProperty('color') || prop.hasOwnProperty('font-color')) {
                var color = (prop.hasOwnProperty('color')) ? prop.color : prop['font-color'];
                result.color = color;
            } else {
                result.color = defaultStyle.color;
            }

            if (prop.hasOwnProperty('stroke')) {
                var stroke = prop.stroke; // {color, thickness}
                result.stroke = (stroke.hasOwnProperty('color')) ? stroke.color : defaultStyle.stroke;
                result.strokeThickness = (stroke.hasOwnProperty('thickness')) ? stroke.thickness : defaultStyle.strokeThickness;
            } else {
                result.stroke = defaultStyle.stroke;
                result.strokeThickness = defaultStyle.strokeThickness;
            }
        } else {
            result.image = prop.img;
        }

        if (prop.hasOwnProperty('shadow')) {
            var shadow = prop.shadow; // {color, offsetX, offsetY, blur}
            result.shadowColor = (shadow.hasOwnProperty('color')) ? shadow.color : defaultStyle.shadowColor;
            result.shadowOffsetX = (shadow.hasOwnProperty('offsetX')) ? shadow.offsetX : defaultStyle.shadowOffsetX;
            result.shadowOffsetY = (shadow.hasOwnProperty('offsetY')) ? shadow.offsetY : defaultStyle.shadowOffsetY;
            result.shadowBlur = (shadow.hasOwnProperty('blur')) ? shadow.blur : defaultStyle.shadowBlur;
            result.shadowStroke = true;
            result.shadowFill = true;
        } else {
            result.shadowColor = defaultStyle.shadowColor;
            result.shadowOffsetX = defaultStyle.shadowOffsetX;
            result.shadowOffsetY = defaultStyle.shadowOffsetY;
            result.shadowBlur = defaultStyle.shadowBlur;
            result.shadowStroke = defaultStyle.shadowStroke;
            result.shadowFill = defaultStyle.shadowFill;
        }

        if (prop.hasOwnProperty('u') || prop.hasOwnProperty('underline')) {
            var u = (prop.hasOwnProperty('u')) ? prop.u : prop.underline; // {color, thickness, offset}
            result.underlineColor = (u.hasOwnProperty('color')) ? u.color : defaultStyle.underlineColor;
            result.underlineThickness = (u.hasOwnProperty('thickness')) ? u.thickness : defaultStyle.underlineThickness;
            result.underlineOffset = (u.hasOwnProperty('offset')) ? u.offset : defaultStyle.underlineOffset;
        } else {
            result.underlineColor = defaultStyle.underlineColor;
            result.underlineThickness = defaultStyle.underlineThickness;
            result.underlineOffset = defaultStyle.underlineOffset;
        }

        return result;
    }

    getStrokeThinkness(defaultStyle, prop) {
        var strokeThinkness;
        if (prop.hasOwnProperty('stroke')) {
            var stroke = prop.stroke; // {color, thickness}           
            strokeThinkness = (stroke.hasOwnProperty('thickness')) ? stroke.thickness : defaultStyle.strokeThickness;
        } else {
            strokeThinkness = defaultStyle.strokeThickness;
        }
        return strokeThinkness;
    }

    propToTagText(text, prop, prevProp) {
        if (prop.hasOwnProperty('_class')) { // class mode
            if (text === '') {
                if (this.isTextTag(prop._class)) {
                    return '';
                }
            }
            return `<class='${prop._class}'>${text}</class>`;
        } else if (prop.hasOwnProperty('_style')) { // class mode
            return `<style='${prop._style}'>${text}</style>`;
        } else {
            return text;
        }
    }

    destroy() {
        this.tags = undefined;
    }

    isTextTag(tagName) {
        var tag = this.tags[tagName];
        if (tag) {
            return (tag.img == null);
        } else { // tag not found
            return false;
        }
    }
};

var StyleToProp = function (s) {
    s = s.split(";");

    var result = {},
        prop, k, v;
    for (var i = 0, slen = s.length; i < slen; i++) {
        prop = s[i].split(":");
        k = prop[0], v = prop[1];
        if (isEmpty(k) || isEmpty(v)) {
            continue;
        }

        switch (k) {
            case 'stroke':
                var stroke = v.split(' '); // stroke:blue 1px
                var len = stroke.length;
                v = {};
                if (len >= 1) {
                    v.color = stroke[0];
                }
                if (len >= 2) {
                    v.thickness = parseInt(stroke[1].replace('px', ''));
                }
                break;

            case 'shadow':
                var shadow = v.split(' '); // shadow:blue 2px 2px 2px
                var len = shadow.length;
                v = {};
                if (len >= 1) {
                    v.color = shadow[0];
                }
                if (len >= 2) {
                    v.offsetX = parseInt(shadow[1].replace('px', ''));
                }
                if (len >= 3) {
                    v.offsetY = parseInt(shadow[2].replace('px', ''));
                }
                if (len >= 4) {
                    v.blur = parseInt(shadow[3].replace('px', ''));
                }
                break;

            case 'u':
            case 'underline': // underline:blue 3px -1px
                var u = v.split(' ');
                var len = u.length;
                v = {};
                if (len >= 1) {
                    v.color = u[0];
                }
                if (len >= 2) {
                    v.thickness = parseInt(u[1].replace('px', ''));
                }
                if (len >= 3) {
                    v.offset = parseInt(u[2].replace('px', ''));
                }
                break;

            case 'y':
                v = parseFloat(v);
                break;
        }
        result[k] = v;
    }
    return result;
};

var isEmpty = function (s) {
    // Remove white spaces.
    s = s.replace(RE_SPACE, '');
    return (s.length === 0);
};

var RE_SPLITTEXT = /<\s*class=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/class\s*\>|<\s*style=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/style\s*\>/g;
var RE_CLASS_HEADER = /<\s*class=/i;
var RE_CLASS = /<\s*class=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/class\s*\>/;
var RE_STYLE_HEADER = /<\s*style=/i;
var RE_STYLE = /<\s*style=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/style\s*\>/;
var RE_SPACE = /^\s+|\s+$/;

export default Parser;