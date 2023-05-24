import LeaderBoard from './LeaderBoard.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('leaderBoard', function (config) {
    return new LeaderBoard(config);
});

SetValue(window, 'RexPlugins.Fire.LeaderBoard', LeaderBoard);

export default LeaderBoard;