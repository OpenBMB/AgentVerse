var MaskToGameObject = function (mask) {
    return (mask.hasOwnProperty('geometryMask')) ? mask.geometryMask : mask.bitmapMask;
}
export default MaskToGameObject;