import Container from '../../../container/containerlite/ContainerLite.js';
import ForEachFace from './ForEachFace.js';

const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

class FaceContainer extends Container {
    constructor(scene, x, y, width, height, faces) {
        super(scene, x, y, width, height);
        this.faces = faces;  // Face Dictionary, or array

        ForEachFace(faces, function (face) {
            face.setPosition(x, y);
            this.add(face);
        }, this, true);
    }

    // Override
    get rotationX() {
        return 0;
    }

    // Override
    set rotationX(value) {
        // rad
    }

    get angleX() {
        return RadToDeg(this.rotationX);
    }

    set angleX(value) {
        this.rotationX = DegToRad(value);
    }

    // Override
    get rotationY() {
        return 0;
    }

    // Override
    set rotationY(value) {
        // rad
    }

    get angleY() {
        return RadToDeg(this.rotationY);
    }

    set angleY(value) {
        this.rotationY = DegToRad(value);
    }

    // Override
    get rotationZ() {
        return 0;
    }

    // Override
    set rotationZ(value) {
        // rad
    }

    get angleZ() {
        return RadToDeg(this.rotationZ);
    }

    set angleZ(value) {
        this.rotationZ = DegToRad(value);
    }

    setDebug(graphic, callback) {
        ForEachFace(this.faces, function (face) {
            face.setDebug(graphic, callback);
        }, null, true);
        return this;
    }

    panX(v) {
        ForEachFace(this.faces, function (face) {
            face.panX(v);
        }, null, true);
        return this;
    }

    panY(v) {
        ForEachFace(this.faces, function (face) {
            face.panY(v);
        }, null, true);
        return this;
    }

    panZ(v) {
        ForEachFace(this.faces, function (face) {
            face.panZ(v);
        }, null, true);
        return this;
    }

    transformVerts(x, y, z, rotateX, rotateY, rotateZ) {
        ForEachFace(this.faces, function (face) {
            face.transformVerts(x, y, z, rotateX, rotateY, rotateZ);
        }, null, true);
        return this;
    }

    forEachFace(callback, scope, ignoreInvalid) {
        ForEachFace(this.faces, callback, scope, ignoreInvalid);
        return this;
    }

}

export default FaceContainer;