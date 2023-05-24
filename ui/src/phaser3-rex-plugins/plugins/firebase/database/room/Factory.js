import Room from './Room.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('room', function (config) {
    return new Room(config);
});

SetValue(window, 'RexPlugins.Fire.Room', Room);

export default Room;