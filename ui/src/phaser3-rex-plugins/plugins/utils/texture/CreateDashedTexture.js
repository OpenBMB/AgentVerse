var CreateDashedTexture = function (scene, key, width, k, color, height) {
    if (width === undefined) {
        width = 10;
    }
    if (k === undefined) {
        k = 0.5;
    }
    if (color === undefined) {
        color = 0xffffff;
    }
    if (height === undefined) {
        height = 2;
    }

    scene.add.graphics()
        .fillStyle(color)
        .fillRect(0, 0, (width * k), height)
        .generateTexture(key, width, height)
        .destroy();
}
export default CreateDashedTexture;