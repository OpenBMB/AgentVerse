import { CubismMatrix44 } from '../../framework/src/math/cubismmatrix44';

class CanvasMatrix extends CubismMatrix44 {
    constructor() {
        super();

        this.setSize(0, 0);
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;

        if (width > height) {
            this.scale(1.0, width / height);
        } else {
            this.scale(height / width, 1.0);
        }

        return this;
    }

    toLocalX(x) {
        var t = (this.width === 0) ? 0 : (x / this.width);
        return (2 * t) - 1;
    }

    toLocalY(y) {
        var t = (this.height === 0) ? 0 : (y / this.height);
        return 1 - (2 * t);
    }
}

export default CanvasMatrix;