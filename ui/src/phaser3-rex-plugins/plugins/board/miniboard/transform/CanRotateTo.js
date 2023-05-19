var CanRotateTo = function(direction) {
    direction -= this.face;
    return this.canRotate(direction);
}
export default CanRotateTo;