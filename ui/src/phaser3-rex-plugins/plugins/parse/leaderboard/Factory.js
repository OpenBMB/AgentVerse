import Leaderboard from './Leaderboard.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('leaderBoard', function (config) {
    return new Leaderboard(config);
});

SetValue(window, 'RexPlugins.Parse.Leaderboard', Leaderboard);

export default Leaderboard;