import ExpressionParser from '../ExpressionParser';

export default Compile;

declare var Compile: (
    expression: string
) => ExpressionParser.ExpressionCallbackType;