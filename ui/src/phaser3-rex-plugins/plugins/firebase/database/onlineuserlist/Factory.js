import OnlineUserList from './OnlineUserList.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('onlineUserList', function (config) {
    return new OnlineUserList(config);
});

SetValue(window, 'RexPlugins.Fire.OnlineUserList', OnlineUserList);

export default OnlineUserList;