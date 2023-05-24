var RemoveAllVertices = function (destroy) {
    for (var vertexUid in this.vertices) {
        this.removeVertex(vertexUid, destroy)
    }
    return this;
};

export default RemoveAllVertices;