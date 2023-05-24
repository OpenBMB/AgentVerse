import GetGame from './GetGame.js';

var GetTickDelta = function (game) {
    return GetGame(game).loop.delta;
}

export default GetTickDelta;