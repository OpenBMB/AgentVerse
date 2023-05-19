import GetGraphItem from '../../graphitem/GetGraphItem.js';

var RemoveEdge = function (gameObejct, destroy) {
    if (this.isEdge(gameObejct)) {
        return this;
    }

    if (destroy === undefined) {
        destroy = false;
    }

    var uid = this.getObjUID(gameObejct);
    // Remove edge
    delete this.edges[uid];
    this.edgeCount--;
    // Clear reference of graph
    GetGraphItem(gameObejct).setGraph(null);
    if (destroy && gameObejct.destroy) {
        gameObject.destroy();
    }
    return this;
}

export default RemoveEdge;