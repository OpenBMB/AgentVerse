import Quad from '../../../utils/grid/quad/Quad.js';
import SaveOrigin from '../utils/SaveOrigin.js';
import RestoreOrigin from '../utils/RestoreOrigin.js';
import GetTileXYAtDirection from '../../../utils/grid/quad/GetTileXYAtDirection.js';
import GetNeighborTileXY from '../../../utils/grid/quad/GetNeighborTileXY.js';
import GetNeighborTileDirection from '../../../utils/grid/quad/GetNeighborTileDirection.js';
import GetOppositeDirection from '../../../utils/grid/quad/GetOppositeDirection.js';
import Offset from '../../../utils/grid/quad/Offset.js';
import Mirror from '../../../utils/grid/quad/Mirror.js';
import Rotate from '../../../utils/grid/quad/Rotate.js';
import GetDistance from '../../../utils/grid/quad/GetDistance.js';
import DirectionBetween from '../../../utils/grid/quad/DirectionBetween.js';
import DirectionNormalize from '../utils/DirectionNormalize.js';
import GetGridPoints from './GetGridPoints.js';
import GetBounds from './GetBounds.js';
import RingToTileXYArray from '../../../utils/grid/quad/RingToTileXYArray.js';

class QuadGrid extends Quad {
    constructor(config) {
        super(config);
        this.sides = 4;
    }

    // resetFromJSON(o) {
    //     super.resetFromJSON(o);
    // }

    // Direction of neighbors
    get allDirections() {
        return (this.directions === 4) ? ALLDIR4 : ALLDIR8;
    }

    // Board-match
    get halfDirections() {
        return (this.directions === 4) ? HALFDIR4 : HALFDIR8;
    }

    // setOriginPosition
    // setCellSize
    // setType
    // getWorldXY
    // getTileXY
    // getGridPolygon        
}

const ALLDIR4 = [0, 1, 2, 3];
const ALLDIR8 = [0, 1, 2, 3, 4, 5, 6, 7];
const HALFDIR4 = [0, 1];
const HALFDIR8 = [0, 1, 4, 5];

var methods = {
    saveOrigin: SaveOrigin,
    restoreOrigin: RestoreOrigin,
    getTileXYAtDirection: GetTileXYAtDirection,
    getNeighborTileXY: GetNeighborTileXY,
    getNeighborTileDirection: GetNeighborTileDirection,
    getOppositeDirection: GetOppositeDirection,
    offset: Offset,
    mirror: Mirror,
    rotate: Rotate,
    getDistance: GetDistance,
    directionBetween: DirectionBetween,
    directionNormalize: DirectionNormalize,
    getGridPoints: GetGridPoints,
    getBounds: GetBounds,
    ringToTileXYArray: RingToTileXYArray,
}
Object.assign(
    QuadGrid.prototype,
    methods
);

export default QuadGrid;