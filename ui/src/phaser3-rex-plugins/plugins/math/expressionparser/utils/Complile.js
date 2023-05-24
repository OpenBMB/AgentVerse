import ExpressionParser from '../ExpressionParser.js';

var parser = new ExpressionParser();
var Compile = function(expression) {
    return parser.compile(expression);
}

export default Compile;