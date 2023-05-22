import Monopoly from './Monopoly.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('monopoly', function (gameObject, config) {
    return new Monopoly(gameObject, config);
});

SetValue(window, 'RexPlugins.Board.Monopoly', Monopoly);

export default Monopoly;