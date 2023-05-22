import ExpressionParser from './expressionparser.js';
import Compile from './math/expressionparser/utils/Complile.js';
import CreateProxyContext from './utils/proxy/createproxycontext/CreateProxyContext.js';
import SetValue from './utils/object/SetValue.js';

class ExpressionParserPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add() {
        return new ExpressionParser();
    }

    compile(expression) {
        return Compile(expression);
    }

    createProxyContext(config, baseContext) {
        return CreateProxyContext(config, baseContext);
    }
}

SetValue(window, 'RexPlugins.ExpressionParser', ExpressionParser);

export default ExpressionParserPlugin;