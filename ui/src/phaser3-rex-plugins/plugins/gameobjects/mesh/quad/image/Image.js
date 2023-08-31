import InitFaces from './methods/InitFaces.js';
import GetPointPosition from './methods/GetPointPosition.js';

const Mesh = Phaser.GameObjects.Mesh;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class Image extends Mesh {
    constructor(scene, x, y, key, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', null);
            frame = GetValue(config, 'frame', null);
        }

        super(scene, x, y, key, frame);
        this.type = 'rexQuadImage';
        this.isNinePointMode = GetValue(config, 'ninePointMode', false);
        this.fourPointsModeRTL = GetValue(config, 'rtl', false);
        this.controlPoints = [];

        InitFaces(this);
        this.hideCCW = false;
        this.syncSize();
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);

        for (var i = 0, cnt = this.controlPoints.length; i < cnt; i++) {
            this.controlPoints[i].destroy();
        }
        this.controlPoints = undefined;
    }

    resetVerts() {
        // Clear faces and vertices        
        this.dirtyCache[9] = -1;

        var points = GetPointPosition(this);

        // Calculate vertex data
        var srcWidth = this.width;
        var srcHeight = this.height;
        var vHalfWidth = (this.frame.cutWidth / srcHeight) / 2;
        var vHalfHeight = (this.frame.cutHeight / srcHeight) / 2;

        var frameU0 = this.frame.u0;
        var frameU1 = this.frame.u1;
        var frameV0 = this.frame.v0;
        var frameV1 = this.frame.v1;
        var frameU = frameU1 - frameU0;
        var frameV = frameV1 - frameV0;

        // Update vertex
        var controlPoints = this.controlPoints;
        for (var i = 0, cnt = points.length; i < cnt; i += 2) {
            var px = points[i + 0];
            var py = points[i + 1];
            var vertexIndex = i / 2;

            var x = (px / srcHeight) - vHalfWidth;
            var y = (py / srcHeight) - vHalfHeight;
            var u = frameU0 + (frameU * (px / srcWidth));
            var v = frameV0 + (frameV * (py / srcHeight));
            this.vertices[vertexIndex]
                .set(x, -y, 0)
                .setUVs(u, v)

            controlPoints[vertexIndex].resetLocalXY(px, py);
        }

        return this;
    }

    syncSize() {
        this.setSizeToFrame();  // Reset size
        this.setOrtho(this.width / this.height, 1);
        this.resetVerts();  // Reset verts
        return this;
    }

    forceUpdate() {
        this.dirtyCache[10] = 1;
        return this;
    }

    get tint() {
        if (this.vertices.length === 0) {
            return 0xffffff;
        } else {
            return this.vertices[0].color;
        }
    }
}

export default Image;