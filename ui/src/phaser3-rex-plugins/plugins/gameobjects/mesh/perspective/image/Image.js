import TransformVerts from '../utils/TransformVerts';

const Mesh = Phaser.GameObjects.Mesh;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const GenerateGridVerts = Phaser.Geom.Mesh.GenerateGridVerts;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

const FOV = 45;
const PanZ = 1 + (1 / Math.sin(DegToRad(FOV)));

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
        this.type = 'rexPerspectiveImage';
        this.setSizeToFrame();

        this.resetPerspective();
        this.panZ(PanZ);
        this.hideCCW = GetValue(config, 'hideCCW', true);

        var gridWidth = GetValue(config, 'gridWidth', 32);
        var gridHeight = GetValue(config, 'gridHeight', gridWidth);
        this.resetVerts(gridWidth, gridHeight);
    }

    get originX() {
        return 0.5;
    }

    get originY() {
        return 0.5;
    }

    resetPerspective() {
        this.setPerspective(this.width, this.height, FOV);
        return this;
    }

    resetVerts(gridWidth, gridHeight) {
        if (gridWidth !== undefined) {
            this.gridWidth = gridWidth;
        }
        if (gridHeight !== undefined) {
            this.gridHeight = gridHeight;
        }

        // Clear faces and vertices
        this.clear();
        this.dirtyCache[9] = -1;
        if ((this.width === 0) || (this.height === 0)) {
            return this;
        }

        // Generate faces and vertices
        var frameWidth = this.frame.cutWidth,
            frameHeight = this.frame.cutHeight;
        GenerateGridVerts({
            mesh: this,
            texture: this.texture.key, frame: this.frame.name,

            width: frameWidth / this.height,
            height: frameHeight / this.height,

            widthSegments: Math.ceil(frameWidth / this.gridWidth),
            heightSegments: Math.ceil(frameHeight / this.gridHeight),
        });

        // Recover vertices transform
        var transformInfo = this.transformInfo;
        if (transformInfo) {
            this.transformVerts(
                transformInfo.x, transformInfo.y, transformInfo.z,
                transformInfo.rotateX, transformInfo.rotateY, transformInfo.rotateZ
            );
        }

        return this;
    }

    syncSize() {
        this.setSizeToFrame();  // Reset size
        this.resetPerspective();  // Reset perspective
        this.resetVerts();  // Reset verts
        return this;
    }

    get rotationX() {
        return this.modelRotation.x;
    }

    set rotationX(value) {
        this.modelRotation.x = value;
    }

    get angleX() {
        return RadToDeg(this.rotationX);
    }

    set angleX(value) {
        this.rotationX = DegToRad(value);
    }

    get rotationY() {
        return this.modelRotation.y;
    }

    set rotationY(value) {
        this.modelRotation.y = value;
    }

    get angleY() {
        return RadToDeg(this.rotationY);
    }

    set angleY(value) {
        this.rotationY = DegToRad(value);
    }

    get rotationZ() {
        return this.modelRotation.z;
    }

    set rotationZ(value) {
        this.modelRotation.z = value;
    }

    get angleZ() {
        return RadToDeg(this.rotationZ);
    }

    set angleZ(value) {
        this.rotationZ = DegToRad(value);
    }

    transformVerts(x, y, z, rotateX, rotateY, rotateZ) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (z === undefined) { z = 0; }
        if (rotateX === undefined) { rotateX = 0; }
        if (rotateY === undefined) { rotateY = 0; }
        if (rotateZ === undefined) { rotateZ = 0; }

        if (!this.transformInfo) {
            this.transformInfo = {};
        }

        this.transformInfo.x = x;
        this.transformInfo.y = y;
        this.transformInfo.rotateX = rotateX;
        this.transformInfo.rotateY = rotateY;
        this.transformInfo.rotateZ = rotateZ;

        TransformVerts(this, x, y, z, rotateX, rotateY, rotateZ);
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