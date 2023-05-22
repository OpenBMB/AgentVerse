import CanMoveToTile from './CanMoveToTile.js';
import MoveToTile from './MoveToTile.js';
import MoveToward from './MoveToward.js';
import MoveToRandomNeighbor from './MoveToRandomNeighbor.js';
import MoveAway from './MoveAway.js';
import MoveCloser from './MoveCloser.js';

export default {
    canMoveTo: CanMoveToTile,
    moveTo: MoveToTile,
    moveToward: MoveToward,
    moveToRandomNeighbor: MoveToRandomNeighbor,
    moveAway: MoveAway,
    moveCloser: MoveCloser,
};