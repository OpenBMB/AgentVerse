import ExpressionParser from './expressionparser';
import Compile from './math/expressionparser/utils/Compile';
import CreateProxyContext from './math/expressionparser/utils/CreateProxyContext';

export default class ExpressionParserPlugin extends Phaser.Plugins.BasePlugin {
    add(): ExpressionParser;

    compile: typeof Compile;

    createProxyContext: typeof CreateProxyContext;
}