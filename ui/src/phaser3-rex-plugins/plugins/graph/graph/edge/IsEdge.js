var IsEdge = function (gameObejct) {
    // uid or game object
    var uid = this.getObjUID(gameObejct);
    return this.edges.hasOwnProperty(uid);
}

export default IsEdge;