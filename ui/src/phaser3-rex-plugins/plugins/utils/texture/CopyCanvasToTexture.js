var CopyCanvasToTexture = function (scene, srcCanvas, key, x, y, width, height) {
    var textures = scene.sys.textures;
    var renderer = scene.renderer;

    if (x === undefined) {
        x = 0;
    }
    if (y === undefined) {
        y = 0;
    }
    if (width === undefined) {
        width = srcCanvas.width;
    }
    if (height === undefined) {
        height = srcCanvas.height;
    }

    var texture;
    if (textures.exists(key)) {
        texture = textures.get(key);
    } else {
        texture = textures.createCanvas(key, width, height);
    }

    var destCanvas = texture.getSourceImage();
    if (destCanvas.width !== width) {
        destCanvas.width = width;
    }
    if (destCanvas.height !== height) {
        destCanvas.height = height;
    }

    var destCtx = destCanvas.getContext('2d', { willReadFrequently: true });
    destCtx.clearRect(0, 0, width, height);
    destCtx.drawImage(srcCanvas, x, y, width, height);
    if (renderer.gl && texture) {
        renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
    }
}

export default CopyCanvasToTexture;