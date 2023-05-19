import DefaultMaskGraphics from '../../../../utils/mask/defaultmaskgraphics/DefaultMaskGraphics.js';

var AddChildMask = function (maskTarget, sizeTarget, shape, padding) {
    var maskGameObject = new DefaultMaskGraphics(sizeTarget, shape, padding); // A Graphics game object
    if (maskTarget && !maskTarget.isRexSizer) { // Sizer game object can't apply mask
        var mask = maskGameObject.createGeometryMask();
        maskTarget.setMask(mask);
        this.once('destroy', function () {
            maskTarget.setMask();
            mask.destroy();
        })
    }
    this.pin(maskGameObject);
    return maskGameObject;
}

export default AddChildMask;