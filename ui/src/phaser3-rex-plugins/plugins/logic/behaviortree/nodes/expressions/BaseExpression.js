class BaseExpression {
    setExpressionHandler(callback) {
        this.expressionHandler = callback;
        return this;
    }

    eval(context) {
        return this.expressionHandler(context);
    }
}

export default BaseExpression;