const GameClass = Phaser.Game;
var IsGame = function (object) {
    return (object instanceof GameClass);
}
export default IsGame;