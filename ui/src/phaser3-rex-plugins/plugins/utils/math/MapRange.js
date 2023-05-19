var MapRange = function (value, start1, end1, start2, end2) {
    var p = (value - start1) / (end1 - start1);
    return start2 + (p * (end2 - start2));
}

export default MapRange;