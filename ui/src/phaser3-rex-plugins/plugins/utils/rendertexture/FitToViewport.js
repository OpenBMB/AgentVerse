import GetViewport from '../system/GetViewport.js';

var FitToViewport = function (renderTexture, camera) {
    if (camera === undefined) {
        camera = renderTexture.scene.cameras.main;
    }

    renderTexture.setOrigin(0);

    var viewport = GetViewport(renderTexture.scene, camera);
    var x = viewport.x,
        y = viewport.y,
        w = viewport.width,
        h = viewport.height;

    if ((w !== renderTexture.width) || (h !== renderTexture.height)) {
        renderTexture.setSize(w, h);
    } else {
        renderTexture.clear();
    }

    renderTexture.setPosition(x, y);
    renderTexture.camera.setScroll(x, y);

    return renderTexture;
}

export default FitToViewport