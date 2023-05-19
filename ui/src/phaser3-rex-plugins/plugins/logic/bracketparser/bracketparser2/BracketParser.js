import BracketParserBase from '../bracketparserbase/BracketParser.js';
import EscapeRegex from '../../../utils/string/EscapeRegex.js';
import ParseValue from './ParseValue.js';


class BracketParser extends BracketParserBase {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }

        if (!config.hasOwnProperty('multipleLinesTag')) {
            config.multipleLinesTag = true;
        }

        super(config);
    }

    setDelimiters(delimiterLeft, delimiterRight) {
        super.setDelimiters(delimiterLeft, delimiterRight);

        this.reTagName = RegExp(reTagName, 'i');
        this.reParamPair = RegExp(reParamPair, 'gi');

        return this;
    }

    onTag(tagContent) {
        var regexResult = tagContent.match(this.reTagName);
        var tagName = regexResult[1];

        if (this.translateTagNameCallback) {
            tagName = this.translateTagNameCallback(tagName);
        }

        this.reParamPair.lastIndex = regexResult.index + regexResult[0].length;
        var payload = {};
        while (true) {
            var regexResult = this.reParamPair.exec(tagContent);
            if (!regexResult) {
                break;
            }
            payload[regexResult[1]] = ParseValue(regexResult[2], this.valueConverter);
        }

        var isEndTag = (tagName.charAt(0) === '/');
        if (isEndTag) {
            tagName = tagName.substring(1, tagName.length);
        }

        var eventPrefix = (isEndTag) ? '-' : '+';
        this.skipEventFlag = false;
        this.emit(`${eventPrefix}${tagName}`, payload);
        if (!this.skipEventFlag) {
            this.emit(eventPrefix, tagName, payload);
        }

        if (!isEndTag) {
            this.lastTagStart = tagName;
        } else {
            this.lastTagEnd = tagName;
        }
    }
}

var CreateQuotesExpression = function (leftQuote, rightQuote) {
    if (rightQuote === undefined) {
        rightQuote = leftQuote;
    }
    leftQuote = EscapeRegex(leftQuote);
    rightQuote = EscapeRegex(rightQuote);
    return `${leftQuote}[^${leftQuote}${rightQuote}]+${rightQuote}`
}

const varName = `[^ =\n]+`;  // Any character except space ,'=', and '\n'
const varStringValue = `${CreateQuotesExpression('"')}|${CreateQuotesExpression("'")}`;
const varArrayValue = CreateQuotesExpression('[', ']');
const varDictionaryValue = CreateQuotesExpression('{', '}');
const varValue = `${varStringValue}|${varArrayValue}|${varDictionaryValue}|${varName}`;  // Any character except '='
const escapeSpace = `[ \n]*`;
const reTagName = `${escapeSpace}(${varName})${escapeSpace}`;
const reParamPair = `(${varName})${escapeSpace}=${escapeSpace}(${varValue})${escapeSpace}`

export default BracketParser;