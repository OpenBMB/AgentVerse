var GetVertexData = function (gameObejct, createIfNotExisted) {
    if (createIfNotExisted === undefined) {
        createIfNotExisted = false;
    }

    // uid or game object
    var uid = this.getObjUID(gameObejct);
    if (createIfNotExisted && !this.vertices.hasOwnProperty(uid)) {
        this.vertices[uid] = {};
    }
    return this.vertices[uid];
};

export default GetVertexData;