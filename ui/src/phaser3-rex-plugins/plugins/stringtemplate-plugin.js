import StringTemplate from './stringtemplate.js';
import Compile from './string/stringtemplate/utils/Complile.js';
import Render from './string/stringtemplate/utils/Render.js';
import CreateProxyContext from './utils/proxy/createproxycontext/CreateProxyContext.js';
import SetValue from './utils/object/SetValue.js';

class StringTemplatePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new StringTemplate(config);
    }

    compile(content, config) {
        return Compile(content, config);
    }

    render(content, view, config) {
        return Render(content, view, config);
    }

    createProxyContext(config, baseContext) {
        return CreateProxyContext(config, baseContext);
    }
}

SetValue(window, 'RexPlugins.StringTemplate', StringTemplate);

export default StringTemplatePlugin;