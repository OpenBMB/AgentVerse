import Shape from './Shape.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('shape', function (board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard) {
    var gameObject = new Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard); 
    board.scene.add.existing(gameObject);  
    return gameObject;
});

SetValue(window, 'RexPlugins.Board.Shape', Shape);

export default Shape;