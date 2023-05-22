import BaseExpression from './BaseExpression.js';
import Compile from '../../../../string/stringtemplate/utils/Complile.js';

class StringTemplateExpression extends BaseExpression {
    constructor(expression) {
        super();

        var callback = Compile(expression);
        this.setExpressionHandler(callback);
    }
}

export default StringTemplateExpression;