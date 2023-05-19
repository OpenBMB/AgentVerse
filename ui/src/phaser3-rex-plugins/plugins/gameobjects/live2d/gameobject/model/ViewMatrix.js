import { CubismMatrix44 } from '../../framework/src/math/cubismmatrix44';

class ViewMatrix extends CubismMatrix44 {
    copyFrom(matrix) {
        this.setMatrix(matrix.getArray());
        return this;
    }

    rotate(angle) {
        // Do nothing if angle = 0
        if (angle === 0) {
            return;
        }

        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        var matrix = this._tr;

        var a = matrix[0];
        var b = matrix[1];
        var c = matrix[4];
        var d = matrix[5];

        matrix[0] = a * cos + c * sin;
        matrix[1] = b * cos + d * sin;
        matrix[4] = a * -sin + c * cos;
        matrix[5] = b * -sin + d * cos;
    }
}

export default ViewMatrix;