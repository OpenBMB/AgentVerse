import HasValue from '../../../../utils/object/HasValue.js';
import SetValue from '../../../../utils/object/SetValue.js';

var InjectDefaultConfig = function (config) {
    var isSingleLineMode = !config.textArea;

    if (!HasValue(config, 'wrap.vAlign')) {
        var defaultValue = (isSingleLineMode) ? 'center' : 'top';
        SetValue(config, 'wrap.vAlign', defaultValue);
    }

    if (!HasValue(config, 'wrap.charWrap')) {
        SetValue(config, 'wrap.charWrap', true);
    }

    if (!HasValue(config, 'wrap.maxLines')) {
        var defaultValue = (isSingleLineMode) ? 1 : undefined;
        SetValue(config, 'wrap.maxLines', defaultValue);
    }

    if (!HasValue(config, 'wrap.useDefaultTextHeight')) {
        SetValue(config, 'wrap.useDefaultTextHeight', true);
    }

    if (!config.edit) {
        config.edit = {};
    }
    if (!HasValue(config.edit, 'inputType')) {
        var defaultValue = (isSingleLineMode) ? 'text' : 'textarea';
        SetValue(config.edit, 'inputType', defaultValue);
    }

    return config;
}

export default InjectDefaultConfig;