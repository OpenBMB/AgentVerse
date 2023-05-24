import FieldOfView from './FieldOfView.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('fieldOfView', function (gameObject, config) {
    return new FieldOfView(gameObject, config);
});

SetValue(window, 'RexPlugins.Board.FieldOfView', FieldOfView);

export default FieldOfView;