
import AStarSearch from './astartsearch/AStarSearch.js';
import GetCost from './GetCost.js';
import FindArea from './FindArea.js';
import GetPath from './GetPath.js';
import FindPath from './FindPath.js';
import TileXYToCost from './TileXYToCost.js';

export default {
    aStarSearch: AStarSearch,
    getCost: GetCost,
    findArea: FindArea,
    getPath: GetPath,
    findPath: FindPath,
    tileXYToCost: TileXYToCost,
};