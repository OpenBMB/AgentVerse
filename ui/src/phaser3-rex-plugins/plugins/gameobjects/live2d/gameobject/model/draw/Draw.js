import UpdateViewMatrix from './UpdateViewMatrix.js';

var Draw = function (calcMatrix) {
    if (!this._model) {
        return;
    }

    var globalData = this._globalData;

    var matrix = UpdateViewMatrix(this, calcMatrix);

    var renderer = this.getRenderer();
    renderer.setMvpMatrix(matrix);
    renderer.setRenderState(globalData.frameBuffer, globalData.viewportRect);
    renderer.drawModel();

    return this;
}

export default Draw;