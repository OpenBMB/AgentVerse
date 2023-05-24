import IsEdge from '../utils/IsEdge.js';

var GetStretchMode = function(colIndex, rowIndex) {
    return (IsEdge.call(this, colIndex, rowIndex)) ? this.stretchMode.edge : this.stretchMode.internal;
};

export default GetStretchMode;