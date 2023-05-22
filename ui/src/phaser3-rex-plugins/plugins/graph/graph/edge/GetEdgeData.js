var GetEdgeData = function (gameObejct, createIfNotExisted) {
    if (createIfNotExisted === undefined) {
        createIfNotExisted = false;
    }

    // uid or game object
    var uid = this.getObjUID(gameObejct);
    if (createIfNotExisted && !this.edges.hasOwnProperty(uid)) {
        this.edges[uid] = {};
    }
    return this.edges[uid];
};

export default GetEdgeData;