import Compile from '../../../../math/expressionparser/utils/Complile.js';
import mustache from 'mustache';

export default {
    evalExpression(expression) {
        if (typeof (expression) === 'number') {
            return expression;
        }

        return Compile(expression)(this.memory);
    },

    renderString(template) {
        return mustache.render(template, this.memory);
    }
}