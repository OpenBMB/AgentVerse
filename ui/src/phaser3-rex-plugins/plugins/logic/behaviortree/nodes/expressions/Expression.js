import BaseExpression from './BaseExpression.js';
import Compile from '../../../../math/expressionparser/utils/Complile.js';

class Expression extends BaseExpression {
    constructor(expression) {
        super();

        var callback;
        if (typeof (expression) === 'number') {
            callback = function () {
                return expression;
            }
        } else {
            callback = Compile(expression);
        }

        this.setExpressionHandler(callback);
    }
}

export default Expression;