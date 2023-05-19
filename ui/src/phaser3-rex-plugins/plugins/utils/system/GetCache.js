import GetGame from './GetGame.js';

var GetCache = function (game, loaderType, cacheType) {
    if (cacheType === undefined) {
        switch (loaderType) {
            case 'image':
            case 'svg':
                cacheType = 'textures';
                break;

            case 'animation':
                cacheType = 'json';
                break;

            case 'tilemapTiledJSON':
            case 'tilemapCSV':
                cacheType = 'tilemap';
                break;

            case 'glsl':
                cacheType = 'shader';
                break;

            default:
                cacheType = loaderType;
                break;
        }
    }

    game = GetGame(game);
    var cache;
    if (cacheType === 'textures') {
        cache = game.textures;
    } else {
        cache = game.cache[cacheType];
    }
    return cache;
}

export default GetCache;