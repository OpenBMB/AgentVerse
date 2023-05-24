import ObjectFactory from './board/ObjectFactory.js';

import BoardFactory from './board/board/Factory.js';
import HexagonFactory from './board/grid/hexagon/Factory.js';
import QuadFactory from './board/grid/quad/Factory.js';
import ShapeFactory from './board/shape/Factory.js';

import MoveToFactory from './board/moveto/Factory.js';
import MatchFactory from './board/match/Factory.js';
import PathFinderFactory from './board/pathfinder/Factory.js';
import FieldOfViewFactory from './board/fieldofview/Factory.js';
import MonopolyFactory from './board/monopoly/Factory.js';

import MiniBoardFactory from './board/miniboard/Factory.js';

import HexagonMap from './board/hexagonmap/index.js';

import CreateTileTexture from './board/texture/CreateTileTexture.js';

import CreateBoardFromTilemap from './board/tilemap/CreateBoardFromTilemap.js';

class BoardPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);

        // Helper functions
        this.hexagonMap = HexagonMap;
        this.createTileTexture = CreateTileTexture;
        this.createBoardFromTilemap = CreateBoardFromTilemap;
    }

    start() {
        var eventEmitter = this.scene.sys.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

export default BoardPlugin;
