import SingleRoom from './SingleRoom.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('singleRoom', function (config) {
    return new SingleRoom(config);
});

SetValue(window, 'RexPlugins.Fire.SingleRoom', SingleRoom);

export default SingleRoom;