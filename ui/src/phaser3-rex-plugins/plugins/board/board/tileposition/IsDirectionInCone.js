var IsDirectionInCone = function (chessA, chessB, face, cone) {
    var tileXYA = this.chessToTileXYZ(chessA);
    var tileXYB = this.chessToTileXYZ(chessB);

    var savedDirections = this.grid.directions;  // Save directions
    this.grid.setDirectionMode(this.sides);
    var direction = this.grid.directionBetween(tileXYA, tileXYB, false);
    this.grid.setDirectionMode(savedDirections);  // Restore directions

    var deltaDirection = Math.abs(direction - face);
    deltaDirection = Math.min(deltaDirection, this.grid.directions - deltaDirection);
    return (deltaDirection <= (cone / 2));
}
export default IsDirectionInCone;