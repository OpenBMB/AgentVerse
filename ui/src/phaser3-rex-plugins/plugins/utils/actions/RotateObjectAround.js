const RotateAround = Phaser.Math.RotateAround;

var RotateObjectAround = function (gameObject, x, y, angle) {
    RotateAround(gameObject, x, y, angle);
    gameObject.rotation += angle;
    return gameObject;
}

export default RotateObjectAround;