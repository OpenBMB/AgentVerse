import SplitText from './SplitText.js';
import TagTextToProp from './TagTextToProp.js';
import PropToContextStyle from './PropToContextStyle.js'
import PropToTagText from './PropToTagText.js';
import { GetTagRegex, SetDelimiters } from './TagRegex.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Parser {
    constructor(style) {
        var delimiters = GetValue(style, 'delimiters', '[]');
        this.tagRegex = GetTagRegex(delimiters);
    }

    getStrokeThinkness(defaultStyle, prop) {
        var strokeThickness;
        if (prop.hasOwnProperty('stroke')) {
            strokeThickness = defaultStyle.strokeThickness;
        } else {
            strokeThickness = 0;
        }
        return strokeThickness;
    }

    setDelimiters(delimiterLeft, delimiterRight) {
        if (SetDelimiters(delimiterLeft, delimiterRight)) {
            this.tagRegex = GetTagRegex();
        }
        return this;
    }

}

var methods = {
    splitText: SplitText,
    tagTextToProp: TagTextToProp,
    propToContextStyle: PropToContextStyle,
    propToTagText: PropToTagText,
}

Object.assign(
    Parser.prototype,
    methods
);

export default Parser;