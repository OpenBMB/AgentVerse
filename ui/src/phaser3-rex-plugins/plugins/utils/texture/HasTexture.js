import GetGame from '../system/GetGame.js';

var HasTexture = function (game, key, frame) {
    game = GetGame(game);
    var cache = game.textures;

    var hasTexture = cache.exists(key);
    if (frame === undefined) {
        return hasTexture;
    }

    return cache.get(key).has(frame);
}

export default HasTexture;