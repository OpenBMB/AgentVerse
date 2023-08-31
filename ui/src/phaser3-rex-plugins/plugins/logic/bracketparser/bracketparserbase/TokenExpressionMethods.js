import EscapeRegex from '../../../utils/string/EscapeRegex.js';
import ParseValue from './ParseValue.js';

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

export default {
    setDelimiters(delimiterLeft, delimiterRight) {
        if (delimiterRight === undefined) {
            delimiterRight = delimiterLeft[1];
            delimiterLeft = delimiterLeft[0];
        }
        this.delimiterLeft = delimiterLeft;
        this.delimiterRight = delimiterRight;

        delimiterLeft = EscapeRegex(delimiterLeft);
        delimiterRight = EscapeRegex(delimiterRight);

        this.reTagName = RegExp(reTagName, 'i');
        this.reParamPair = RegExp(reParamPair, 'gi');

        this.reSplit = RegExp(`${delimiterLeft}(.+?)${delimiterRight}`, 'gs');
        return this;
    },

    parseTag(tagContent) {
        var regexResult = tagContent.match(this.reTagName);
        var name = regexResult[1];

        this.reParamPair.lastIndex = regexResult.index + regexResult[0].length;
        var payload = {};
        while (true) {
            var regexResult = this.reParamPair.exec(tagContent);
            if (!regexResult) {
                break;
            }
            payload[regexResult[1]] = ParseValue(regexResult[2], this.valueConverter);
        }

        return {
            name: name,
            payload: payload,
        };
    }
}