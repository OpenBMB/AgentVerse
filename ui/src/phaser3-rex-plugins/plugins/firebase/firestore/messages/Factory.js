import Messages from './Messages.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('messages', function (config) {
    return new Messages(config);
});

SetValue(window, 'RexPlugins.Fire.Messages', Messages);

export default Messages;