import PathFinder from './PathFinder.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('pathFinder', function (gameObject, config) {
    return new PathFinder(gameObject, config);
});

SetValue(window, 'RexPlugins.Board.PathFinder', PathFinder);

export default PathFinder;