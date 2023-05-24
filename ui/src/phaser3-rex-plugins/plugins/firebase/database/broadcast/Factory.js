import Broadcast from './Broadcast.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('broadcast', function (config) {
    return new Broadcast(config);
});

SetValue(window, 'RexPlugins.Fire.Broadcast', Broadcast);

export default Broadcast;