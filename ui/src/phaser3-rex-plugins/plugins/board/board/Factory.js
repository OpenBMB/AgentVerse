import Board from './Board.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('board', function (config) {
    return new Board(this.scene, config);
});

SetValue(window, 'RexPlugins.Board.Board', Board);

export default Board;