import TextStyle from '../../../textbase/textstyle/TextStyle.js';

var PropToContextStyle = function (defaultStyle, prop) {
    var result = STYLE_RESULT;
    if (!prop.hasOwnProperty('img')) {
        result.image = null;

        if (prop.hasOwnProperty('family')) {
            result.fontFamily = prop.family;
        } else {
            result.fontFamily = defaultStyle.fontFamily;
        }

        if (prop.hasOwnProperty('size')) {
            var size = prop.size;
            if (typeof (size) === 'number') {
                size = `${size}px`;
            }
            result.fontSize = size;
        } else {
            result.fontSize = defaultStyle.fontSize;
        }
        result.fontStyle = GetFontStyle(prop);

        if (prop.hasOwnProperty('color')) {
            result.color = prop.color;
        } else {
            result.color = defaultStyle.color;
        }

        if (prop.hasOwnProperty('stroke')) {
            if (prop.stroke === true) {
                result.stroke = defaultStyle.stroke;
                result.strokeThickness = defaultStyle.strokeThickness;
            } else {
                result.stroke = prop.stroke;
                result.strokeThickness = defaultStyle.strokeThickness;
            }
        } else {
            result.stroke = defaultStyle.stroke;
            result.strokeThickness = 0;
        }
    } else {
        result.image = prop.img;
    }

    if (prop.hasOwnProperty('shadow')) {
        if (prop.shadow === true) {
            result.shadowColor = defaultStyle.shadowColor;
            result.shadowOffsetX = defaultStyle.shadowOffsetX;
            result.shadowOffsetY = defaultStyle.shadowOffsetY;
            result.shadowBlur = defaultStyle.shadowBlur;
            result.shadowStroke = true;
            result.shadowFill = true;
        } else {
            result.shadowColor = prop.shadow;
            result.shadowOffsetX = defaultStyle.shadowOffsetX;
            result.shadowOffsetY = defaultStyle.shadowOffsetY;
            result.shadowBlur = defaultStyle.shadowBlur;
            result.shadowStroke = true;
            result.shadowFill = true;
        }
    } else {
        result.shadowColor = '#000';
        result.shadowOffsetX = 0;
        result.shadowOffsetY = 0;
        result.shadowBlur = 0;
        result.shadowStroke = false;
        result.shadowFill = false;
    }

    if (prop.hasOwnProperty('u')) {
        if (prop.u === true) {
            result.underlineColor = defaultStyle.underlineColor;
            result.underlineThickness = defaultStyle.underlineThickness;
            result.underlineOffset = defaultStyle.underlineOffset;
        } else {
            result.underlineColor = prop.u;
            result.underlineThickness = defaultStyle.underlineThickness;
            result.underlineOffset = defaultStyle.underlineOffset;
        }
    } else {
        result.underlineColor = '#000';
        result.underlineThickness = 0;
        result.underlineOffset = 0;
    }

    return result;
}

var GetFontStyle = function (prop) {
    var isBold = prop.b;
    var weight = prop.weight;
    var isItalic = prop.i;

    if (isBold || weight || isItalic) {
        if (isItalic) {
            if (isBold) {
                return 'bold italic';
            } else if (weight) {
                return `${weight} italic`;
            } else {
                return 'italic';
            }
        } else {  // !isItalic
            if (isBold) {
                return 'bold';
            } else {
                return weight.toString();
            }
        }
    } else {
        return '';
    }
};


var STYLE_RESULT = new TextStyle();

export default PropToContextStyle;