var RotateTo = function (direction) {
    direction -= this.face;
    this.rotate(direction);
    return this;
}
export default RotateTo;