var IsVertex = function (gameObejct) {
    // uid or game object
    var uid = this.getObjUID(gameObejct);
    return this.vertices.hasOwnProperty(uid);
}

export default IsVertex;