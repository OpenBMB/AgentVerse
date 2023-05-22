import BracketParserBase from '../bracketparserbase/BracketParser.js';
import GetValue from '../../../utils/object/GetValue.js';
import ParseValue from './ParseValue.js';
import EscapeRegex from '../../../utils/string/EscapeRegex.js';

class BracketParser extends BracketParserBase {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }

        if (!config.hasOwnProperty('multipleLinesTag')) {
            config.multipleLinesTag = false;
        }

        super(config);

        // Parameters for regex
        this.setTagExpression(GetValue(config, 'regex.tag', undefined));
        this.setValueExpression(GetValue(config, 'regex.value', undefined));
        // Brackets and generate regex
        var delimiters = GetValue(config, 'delimiters', '<>');
        this.setDelimiters(delimiters[0], delimiters[1]);
    }

    setTagExpression(express) {
        if (!express) {
            express = DefaultTokenExpression;
        }
        this.tagExpression = express;
        return this;
    }

    setValueExpression(express) {
        if (!express) {
            express = DefaultTokenExpression;
        }
        this.valueExpression = express;
        return this;
    }

    setDelimiters(delimiterLeft, delimiterRight) {
        super.setDelimiters(delimiterLeft, delimiterRight);

        var tag = `(${this.tagExpression})(=(${this.valueExpression}))?`;
        this.reTag = RegExp(tag, 'i');

        if ((this.tagExpression !== DefaultTokenExpression) || (this.valueExpression !== DefaultTokenExpression)) {
            var startTagExpression = `${this.tagExpression}(=${this.valueExpression})?`
            var endTagExpression = `/${this.tagExpression}`;

            delimiterLeft = EscapeRegex(this.delimiterLeft);
            delimiterRight = EscapeRegex(this.delimiterRight);

            var flag = (this.multipleLinesTagEnable) ? 'gs' : 'gi';
            this.reSplit = RegExp(`${delimiterLeft}((${startTagExpression})|(${endTagExpression}))${delimiterRight}`, flag);
        }

        return this;
    }

    onTag(tagContent) {
        var regexResult = tagContent.match(this.reTag);
        var tagName = regexResult[1];
       
        var isEndTag = (tagName.charAt(0) === '/');
        if (isEndTag) {
            tagName = tagName.substring(1, tagName.length);
        }

        if (this.translateTagNameCallback) {
            tagName = this.translateTagNameCallback(tagName);
        }

        this.skipEventFlag = false;
        if (!isEndTag) {
            var values = ParseValue(regexResult[3], this.valueConverter);
            this.emit(`+${tagName}`, ...values);
            if (!this.skipEventFlag) {
                this.emit('+', tagName, ...values);
            }
            this.lastTagStart = tagName;
        } else {
            this.emit(`-${tagName}`);
            if (!this.skipEventFlag) {
                this.emit('-', tagName);
            }
            this.lastTagEnd = tagName;
        }
    }
}

const DefaultTokenExpression = `[^=]+`;

export default BracketParser;