import GetEdgeData from './edge/GetEdgeData.js';
import IsEdge from './edge/IsEdge.js';
import AddEdge from './edge/AddEdge.js';
import RemoveEdge from './edge/RemoveEdge.js';
import GetAllEdges from './edge/GetAllEdges.js';
import GetEdgesOfVertex from './edge/GetEdgesOfVertex.js';
import GetEdgeLength from './edge/GetEdgeLength.js';
import IsInLoop from './edge/IsInLoop.js';

import GetVertexData from './vertex/GetVertexData.js';
import IsVertex from './vertex/IsVertex.js';
import AddVertex from './vertex/AddVertex.js';
import AddVertices from './vertex/AddVertices.js';
import RemoveVertex from './vertex/RemoveVertex.js';
import RemoveAllVertices from './vertex/RemoveAllVertices.js';
import GetAllVertices from './vertex/GetAllVertices.js';
import GetVerticesOfEdge from './vertex/GetVerticesOfEdge.js';
import GetOppositeVertex from './vertex/GetOppositeVertex.js';
import GetAllConnectedVertices from './vertex/GetAllConnectedVertices.js';

import GetNeighborVertices from './neighbors/GetNeighborVertices.js';
import AreNeighborVertices from './neighbors/AreNeighborVertices.js';

export default {
    getEdgeData: GetEdgeData,
    isEdge: IsEdge,
    addEdge: AddEdge,
    removeEdge: RemoveEdge,
    getAllEdges: GetAllEdges,
    getEdgesOfVertex: GetEdgesOfVertex,
    getEdgeLength: GetEdgeLength,
    isInLoop: IsInLoop,

    getVertexData: GetVertexData,
    isVertex: IsVertex,
    addVertex: AddVertex,
    addVertices: AddVertices,
    removeVertex: RemoveVertex,
    removeAllVertices: RemoveAllVertices,
    getAllVertices: GetAllVertices,
    getVerticesOfEdge: GetVerticesOfEdge,
    getOppositeVertex: GetOppositeVertex,
    getAllConnectedVertices: GetAllConnectedVertices,

    getNeighborVertices: GetNeighborVertices,
    areNeighborVertices: AreNeighborVertices,
}