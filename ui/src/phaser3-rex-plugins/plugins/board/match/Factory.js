import Match from './Match.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('match', function (config) {
    return new Match(config);
});

SetValue(window, 'RexPlugins.Board.Match', Match);

export default Match;