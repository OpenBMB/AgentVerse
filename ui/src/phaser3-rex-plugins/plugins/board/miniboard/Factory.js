import MiniBoard from './MiniBoard.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('miniBoard', function (x, y, config) {
    var gameObject = new MiniBoard(this.scene, x, y, config);
    this.scene.add.existing(gameObject);  
    return gameObject;
});

SetValue(window, 'RexPlugins.Board.MiniBoard', MiniBoard);

export default MiniBoard;