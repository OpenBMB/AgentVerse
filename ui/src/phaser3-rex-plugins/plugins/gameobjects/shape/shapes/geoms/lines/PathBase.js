import BaseGeom from '../base/BaseGeom.js';
import FillPathWebGL from '../../../utils/render/FillPathWebGL.js';
import StrokePathWebGL from '../../../utils/render/StrokePathWebGL.js';
import FillStyleCanvas from '../../../utils/render/FillStyleCanvas.js';
import LineStyleCanvas from '../../../utils/render/LineStyleCanvas.js';

const Earcut = Phaser.Geom.Polygon.Earcut;

class PathBase extends BaseGeom {
    constructor() {
        super();

        this.pathData = [];
        this.pathIndexes = [];
        this.closePath = false;
    }

    updateData() {
        this.pathIndexes = Earcut(this.pathData);

        super.updateData();
        return this;
    }

    webglRender(pipeline, calcMatrix, alpha, dx, dy) {
        if (this.isFilled) {
            FillPathWebGL(pipeline, calcMatrix, this, alpha, dx, dy);
        }

        if (this.isStroked) {
            StrokePathWebGL(pipeline, this, alpha, dx, dy);
        }
    }

    canvasRender(ctx, dx, dy) {
        var path = this.pathData;
        var pathLength = path.length - 1;

        var px1 = path[0] - dx;
        var py1 = path[1] - dy;

        ctx.beginPath();

        ctx.moveTo(px1, py1);

        if (!this.closePath) {
            pathLength -= 2;
        }

        for (var i = 2; i < pathLength; i += 2) {
            var px2 = path[i] - dx;
            var py2 = path[i + 1] - dy;
            ctx.lineTo(px2, py2);
        }

        if (this.closePath) {
            ctx.closePath();
        }


        if (this.isFilled) {
            FillStyleCanvas(ctx, this);
            ctx.fill();
        }

        if (this.isStroked) {
            LineStyleCanvas(ctx, this);
            ctx.stroke();
        }
    }
}

export default PathBase;