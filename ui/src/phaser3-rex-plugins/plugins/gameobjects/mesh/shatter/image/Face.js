const Base = Phaser.Geom.Mesh.Face;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;
const RotateFace = Phaser.Geom.Mesh.RotateFace;

class Face extends Base {
    constructor(vertex1, vertex2, vertex3) {
        super(vertex1, vertex2, vertex3);

        this._rotation = 0;
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(value) {
        RotateFace(this, (value - this._rotation));
        this._rotation = value;
    }

    setRotation(value) {
        this.rotation = value;
        return this;
    }

    get angle() {
        return RadToDeg(this.rotation);
    }

    set angle(value) {
        this.rotation = DegToRad(value);
    }

    setAngle(value) {
        this.angle = value;
        return this;
    }

    setAlpha(alpha) {
        this.alpha = alpha;
        return this;
    }

    get tint() {
        var tint1 = this.vertex1.color;
        var tint2 = this.vertex2.color;
        var tint3 = this.vertex3.color;
        return (((((tint1 >> 0) & 0xff) + ((tint2 >> 0) & 0xff) + ((tint3 >> 0) & 0xff)) / 3) << 0) +
            (((((tint1 >> 8) & 0xff) + ((tint2 >> 8) & 0xff) + ((tint3 >> 8) & 0xff)) / 3) << 8) +
            (((((tint1 >> 16) & 0xff) + ((tint2 >> 16) & 0xff) + ((tint3 >> 16) & 0xff)) / 3) << 16);
    }

    set tint(value) {
        this.vertex1.color = value;
        this.vertex2.color = value;
        this.vertex3.color = value;
    }

    setTint(value) {
        this.tint = value;
        return this;
    }
}

export default Face;