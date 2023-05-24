var CreateTriangleTexture = function (
    scene,
    key,
    width, height,
    color,
    direction
) {

    if (height === undefined) {
        height = width;
    }
    if (color === undefined) {
        color = 0xffffff;
    }
    if (direction === undefined) {
        direction = 0;
    }
    if (typeof (direction) === 'string') {
        direction = DIRMODE[direction];
    }

    var x1, y1, x2, y2, x3, y3;
    switch (direction) {
        case 1: // down
            x1 = 0;
            y1 = 0;
            x2 = width;
            y2 = 0;
            x3 = width / 2;
            y3 = height;
            break;
        case 2: // right
            x1 = 0;
            y1 = height / 2;
            x2 = width;
            y2 = 0;
            x3 = width;
            y3 = height;
            break;
        case 3: // up
            x1 = 0;
            y1 = height;
            x2 = width / 2;
            y2 = 0;
            x3 = width;
            y3 = height;
            break;
        default: // 0, right
            x1 = 0;
            y1 = 0;
            x2 = 0;
            y2 = height;
            x3 = width;
            y3 = height / 2;
            break;
    }

    scene.add.graphics()
        .fillStyle(color)
        .fillTriangle(x1, y1, x2, y2, x3, y3)
        .generateTexture(key, width, height)
        .destroy();
}

const DIRMODE = {
    'right': 0,
    'down': 1,
    'left': 2,
    'up': 3,
}
export default CreateTriangleTexture;