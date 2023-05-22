import { Lines } from '../../shapes/geoms';
import DrawFitTriangle from './DrawFitTriangle.js';
import DrawCircleVerticesTriangle from './DrawCircleVerticesTriangle';

export default {
    buildShapes() {
        this
            .addShape(new Lines().setName('triangle'))
    },

    updateShapes() {
        // Set style
        var triangle = this.getShape('triangle');

        if (!this.arrowOnly) {
            triangle
                .fillStyle(this.fillColor, this.fillAlpha)
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
        } else {
            triangle
                .fillStyle()
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
        }

        // Set points
        if (this.shapeMode === 0) {
            DrawFitTriangle.call(this);
        } else {
            DrawCircleVerticesTriangle.call(this);
        }

    }
}