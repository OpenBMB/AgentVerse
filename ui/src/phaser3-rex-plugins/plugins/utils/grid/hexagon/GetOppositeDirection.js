var GetOppositeDirection = function (tileX, tileY, direction) {
    return (direction + 3) % 6;
}
export default GetOppositeDirection;