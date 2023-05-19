import Expression from './Expression.js';

class BooleanExpression extends Expression {
    eval(context) {
        return !!super.eval(context);
    }
}

export default BooleanExpression;